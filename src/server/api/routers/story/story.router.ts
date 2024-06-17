import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { newStoryInput } from "./story.input";
import { getStoryById, startNewStory, startRandomStory } from "./story.service";

export const storyRouter = createTRPCRouter({
  new: protectedProcedure
    .input(newStoryInput)
    .mutation(({ input, ctx }) =>
      startNewStory(input, ctx.db, ctx.session.user),
    ),
  startRandomStory: protectedProcedure.mutation(({ ctx }) =>
    startRandomStory(ctx.db, ctx.session.user),
  ),
  findById: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => getStoryById(input, ctx.db, ctx.session.user)),
});
