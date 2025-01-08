import { ECHO_INTRO } from '~/lib/echo'

export function getUserWelcomePrompt(name?: string | null) {
  return `${ECHO_INTRO}
${
  name
    ? `Introduce yourself and write a message to welcome "${name}" in your style`
    : 'You have to welcome a user. Give any random mysterious name to the user, introduce yourself and write the welcome message in your style.'
}.

Keep the vocabulary easy and give me the content in markdown format.
`
}
