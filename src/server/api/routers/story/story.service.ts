import { type PrismaClient } from "@prisma/client";
import { type User } from "next-auth";
import { newStoryInput, type NewStoryInput } from "./story.input";
import { TRPCError } from "@trpc/server";
import { getNewStoryPrompt } from "./story.prompt";
import { gemini } from "~/lib/gemini";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { ECHO_INTRO } from "~/lib/echo";
import { StructuredOutputParser } from "langchain/output_parsers";

export async function startNewStory(
  input: NewStoryInput,
  db: PrismaClient,
  user: User,
) {
  try {
    const prompt = getNewStoryPrompt(input);
    const response = await gemini.invoke(prompt);

    const storyCreated = await db.story.create({
      data: {
        genre: input.genre,
        base: input.storyBase,
        characterName: input.characterName,
        characterAppearance: input.characterAppearance,
        createdById: user.id,
        messages: {
          createMany: {
            data: [
              /* First instruction message to AI */
              {
                from: "human",
                content: prompt,
              },
              /** Second message is the response from AI */
              {
                from: "ai",
                content: response.content as string,
              },
            ],
          },
        },
      },
    });

    return storyCreated;
  } catch (cause) {
    throw new TRPCError({
      cause,
      message: "Something went wrong",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function startRandomStory(db: PrismaClient, user: User) {
  try {
    const parser = StructuredOutputParser.fromZodSchema(newStoryInput);

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        `${ECHO_INTRO}. \n{format_instructions}\n{question}`,
      ),
      gemini,
      parser,
    ]);

    const storyData = await chain.invoke({
      question:
        "Start a new random story for the user. You have to give the starting of the story to the user so the user can continue.",
      format_instructions: parser.getFormatInstructions(),
    });

    return startNewStory(storyData, db, user);
  } catch (cause) {
    throw new TRPCError({
      cause,
      message: "Something went wrong",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
