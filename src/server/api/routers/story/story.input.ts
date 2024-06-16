import { z } from "zod";

export const newStoryInput = z.object({
  genre: z
    .string()
    .min(1, "Please enter genre for your story")
    .max(100, "Too long"),
  storyBase: z
    .string()
    .min(5, "Please describe your story for setting the base")
    .max(1000, "Too long"),
  characterName: z
    .string()
    .min(1, "Enter the name for your character!")
    .max(100, "Too long"),
  characterAppearance: z
    .string()
    .min(5, "Please describe the appearance of your character")
    .max(1000, "Too long"),
});

export type NewStoryInput = z.infer<typeof newStoryInput>;
