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

export function getPublishStoryPrompt() {
  return `Based on our conversation history, create a compelling story with a clear title, structured chapters, and an engaging narrative. Incorporate all key elements such
as characters, tone and plot details mentioned in the conversation. Ensure the tone of the story matches the theme implied by the inputs (e.g horro, adventure, mystery).
Add dialogues where necessary to bring story to life. Double quote imporant lines from the story.
You have to divide the story into multiple chapters.
You have to give me response in JSON format. DO NOT GIVE ANYTHING ELSE.
Give me an array of objec in JSON. Each object will have the following fields
title: title for the chapter
content: content for the chapter. It should be in markdown format. All important points should be highlighted.
Make sure to give me JSOn only.
`;
}
