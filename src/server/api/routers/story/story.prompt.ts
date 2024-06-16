import { ECHO_INTRO } from "~/lib/echo";
import { type NewStoryInput } from "./story.input";

export function getNewStoryPrompt(input: NewStoryInput) {
  return `
${ECHO_INTRO}
You have to start a new story based on the following details from the user.
Genre of story - ${input.genre}
Base of the story - ${input.storyBase}
Name of the main character - ${input.characterName}
Appearance of the character - ${input.characterAppearance}

You can add any extra information relevant to the story.
Your task is to consume this information and give the starting of the story to the user so the user can continue. 
Give the content in markdown format.
`;
}
