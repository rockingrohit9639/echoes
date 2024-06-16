import { type PrismaClient } from "@prisma/client";
import { type User } from "next-auth";
import { type NewStoryInput } from "./story.input";
import { TRPCError } from "@trpc/server";
import { getNewStoryPrompt } from "./story.prompt";
import { gemini } from "~/lib/gemini";

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
