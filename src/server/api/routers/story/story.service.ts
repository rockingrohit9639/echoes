import { type PrismaClient } from '@prisma/client'
import { type User } from 'next-auth'
import {
  type NewMessageInput,
  newStoryInput,
  newStoryOutput,
  type NewStoryInput,
  type StoryMessageSchema,
  storyMessageSchema,
} from './story.input'
import { TRPCError } from '@trpc/server'
import { getNewStoryPrompt, getPublishStoryPrompt } from './story.prompt'
import { gemini } from '~/lib/gemini'
import { RunnableSequence, RunnableWithMessageHistory } from '@langchain/core/runnables'
import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from '@langchain/core/prompts'
import { ECHO_INTRO } from '~/lib/echo'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { MongoDBChatMessageHistory } from '@langchain/mongodb'
import { messagesCollection } from '~/lib/mongodb'
import { z } from 'zod'
import { validateJSONResponse } from '~/lib/parser'

export async function startNewStory(input: NewStoryInput, db: PrismaClient, user: User) {
  try {
    const parser = StructuredOutputParser.fromZodSchema(newStoryOutput)

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(`${ECHO_INTRO}. \n{format_instructions}\n{question}`),
      gemini,
      parser,
    ])

    const prompt = getNewStoryPrompt(input)

    const newStory = await chain.invoke({
      question: prompt,
      format_instructions: parser.getFormatInstructions(),
    })

    const storyCreated = await db.story.create({
      data: {
        title: newStory.title,
        genre: input.genre,
        base: input.storyBase,
        characterName: input.characterName,
        characterAppearance: input.characterAppearance,
        createdById: user.id,
      },
    })

    const messages: StoryMessageSchema[] = [
      {
        type: 'human',
        data: { content: prompt },
        isInitial: true,
      },
      {
        type: 'ai',
        data: { content: newStory.content },
        isInitial: false,
      },
    ]

    await db.storyHistory.create({
      data: { sessionId: storyCreated.id, messages },
    })

    return storyCreated
  } catch (cause) {
    throw new TRPCError({
      cause,
      message: 'Something went wrong',
      code: 'INTERNAL_SERVER_ERROR',
    })
  }
}

export async function startRandomStory(db: PrismaClient, user: User) {
  try {
    const parser = StructuredOutputParser.fromZodSchema(newStoryInput)

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(`${ECHO_INTRO}. \n{format_instructions}\n{question}`),
      gemini,
      parser,
    ])

    const storyData = await chain.invoke({
      question:
        'Start a new random story for the user. You have to give the starting of the story to the user so the user can continue.',
      format_instructions: parser.getFormatInstructions(),
    })

    return startNewStory(storyData, db, user)
  } catch (cause) {
    throw new TRPCError({
      cause,
      message: 'Something went wrong',
      code: 'INTERNAL_SERVER_ERROR',
    })
  }
}

export async function getStoryById(id: string, db: PrismaClient, user: User) {
  const story = await db.story.findFirst({
    where: { id, createdById: user.id },
  })

  if (!story) {
    throw new TRPCError({
      message: 'Story not found!',
      code: 'NOT_FOUND',
    })
  }

  return story
}

export async function getUserStories(user: User, db: PrismaClient) {
  return db.story.findMany({
    where: { createdById: user.id },
    select: { id: true, title: true, isCompleted: true },
  })
}

export async function getStoryMessages(storyId: string, db: PrismaClient, user: User) {
  const story = await getStoryById(storyId, db, user)
  const storyHistory = await db.storyHistory.findFirst({
    where: { sessionId: story.id },
  })

  if (!storyHistory) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Story history not found!',
    })
  }

  const parsedResponse = z.array(storyMessageSchema).safeParse(storyHistory.messages)

  if (!parsedResponse.success) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Found invalid data for story history!',
    })
  }

  return parsedResponse.data
}

export async function handleNewMessage(input: NewMessageInput, db: PrismaClient, user: User) {
  try {
    /**
     * To handle a new message we have to build the previous conversation b/w the user and our AI model
     * to do that we can fetch all messages of user
     */
    const story = await getStoryById(input.storyId, db, user)

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', ECHO_INTRO],
      new MessagesPlaceholder('messages'),
      ['human', '{user_move}'],
    ])

    const chain = prompt.pipe(gemini)

    const chainWithHistory = new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: (sessionId: string) =>
        new MongoDBChatMessageHistory({
          collection: messagesCollection,
          sessionId,
        }),
      inputMessagesKey: 'user_move',
      historyMessagesKey: 'messages',
    })

    const result = await chainWithHistory.invoke(
      { user_move: input.message },
      { configurable: { sessionId: story.id } },
    )

    return {
      type: 'ai',
      data: { content: result.content as string },
      isInitial: false,
    } as StoryMessageSchema
  } catch (cause) {
    throw new TRPCError({
      cause,
      message: 'Something went wrong',
      code: 'INTERNAL_SERVER_ERROR',
    })
  }
}

export async function publishStory(storyId: string, db: PrismaClient, user: User) {
  const story = await db.story.findFirst({
    where: { id: storyId, createdById: user.id },
  })
  if (!story) {
    throw new TRPCError({
      message: 'Story not found.',
      code: 'NOT_FOUND',
    })
  }

  if (story.isCompleted) {
    throw new TRPCError({
      message: 'Story is already completed.',
      code: 'BAD_REQUEST',
    })
  }

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', ECHO_INTRO],
    new MessagesPlaceholder('messages'),
    ['human', '{user_move}'],
  ])

  const chain = prompt.pipe(gemini)

  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: (sessionId: string) =>
      new MongoDBChatMessageHistory({
        collection: messagesCollection,
        sessionId,
      }),
    inputMessagesKey: 'user_move',
    historyMessagesKey: 'messages',
  })

  const result = await chainWithHistory.invoke(
    { user_move: getPublishStoryPrompt() },
    { configurable: { sessionId: story.id } },
  )

  try {
    const chapters = validateJSONResponse(
      result.content as string,
      z.object({ title: z.string(), content: z.string() }).array(),
    )

    await db.story.update({
      where: { id: storyId },
      data: {
        isCompleted: true,
        finalStory: {
          create: {
            chapters: {
              createMany: { data: chapters },
            },
          },
        },
      },
    })

    return { success: true }
  } catch (cause) {
    throw new TRPCError({
      cause,
      message: 'Something went wrong.',
      code: 'INTERNAL_SERVER_ERROR',
    })
  }
}
