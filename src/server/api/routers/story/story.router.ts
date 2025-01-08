import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../../trpc'
import { newMessageInput, newStoryInput } from './story.input'
import {
  getStoryById,
  getStoryMessages,
  getUserStories,
  handleNewMessage,
  publishStory,
  startNewStory,
  startRandomStory,
} from './story.service'

export const storyRouter = createTRPCRouter({
  new: protectedProcedure
    .input(newStoryInput)
    .mutation(({ input, ctx }) => startNewStory(input, ctx.db, ctx.session.user)),
  startRandomStory: protectedProcedure.mutation(({ ctx }) => startRandomStory(ctx.db, ctx.session.user)),
  findById: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => getStoryById(input, ctx.db, ctx.session.user)),
  findAll: protectedProcedure.query(({ ctx }) => getUserStories(ctx.session.user, ctx.db)),
  findMessages: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => getStoryMessages(input, ctx.db, ctx.session.user)),
  newMessage: protectedProcedure
    .input(newMessageInput)
    .mutation(({ input, ctx }) => handleNewMessage(input, ctx.db, ctx.session.user)),
  publish: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => publishStory(input, ctx.db, ctx.session.user)),
})
