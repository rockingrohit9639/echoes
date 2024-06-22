import { type NewStoryInput } from "./story.input";

export function getNewStoryPrompt(input: NewStoryInput) {
  return `
Start a new story with the following information - 

Genre of story - ${input.genre}
Base of the story - ${input.storyBase}
Name of the main character - ${input.characterName}
Appearance of the character - ${input.characterAppearance}

You can add any extra information relevant to the story.
Your task is to consume this information and give title of the story matching its vibe and the starting of the story to the user so the user can continue. 
Keep the language and vocabulary easy and more readable. Keep this starting shorter to make the story not reveal much information so the user is in suspense.
Give the content in markdown format.
`;
}
