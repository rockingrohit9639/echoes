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

export const newStoryOutput = z.object({
  title: z
    .string()
    .describe("A suitable title for the story matching the vibe of the story"),
  content: z
    .string()
    .max(2000)
    .describe("Starting of the story to the user so the user can continue."),
});

export const newMessageInput = z.object({
  storyId: z.string(),
  message: z.string().min(1, "Please enter your choice").max(100, "Too long"),
});

export type NewMessageInput = z.infer<typeof newMessageInput>;

export const storyMessageSchema = z.object({
  type: z.enum(["human", "ai"]),
  data: z.object({ content: z.string() }),
  isInitial: z.boolean().optional().nullable().default(false),
});

export type StoryMessageSchema = z.infer<typeof storyMessageSchema>;
