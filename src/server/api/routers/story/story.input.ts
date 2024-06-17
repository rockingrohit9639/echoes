import { z } from "zod";

export const newStoryInput = z.object({
  genre: z
    .string()
    .min(1, "Please enter genre for your story")
    .max(100, "Too long")
    .describe(
      'The genre of the story. This can be any literary genre, such as "fantasy," "mystery," "sci-fi," "romance," etc.',
    ),
  storyBase: z
    .string()
    .min(5, "Please describe your story for setting the base")
    .max(1000, "Too long")
    .describe(
      "The setting of the story. This could be a specific location, time period, or a more general description of the world.",
    ),
  characterName: z
    .string()
    .min(1, "Enter the name for your character!")
    .max(100, "Too long")
    .describe("The name of the main character in the story."),
  characterAppearance: z
    .string()
    .min(5, "Please describe the appearance of your character")
    .max(1000, "Too long")
    .describe(
      "A brief description of the character's physical appearance. This can be as detailed or general as desired.",
    ),
});

export type NewStoryInput = z.infer<typeof newStoryInput>;
