# Echoes: Interactive Storytelling with AI

Echoes is an interactive storytelling app that empowers you to craft your own adventure with the help of artificial intelligence. Make choices, explore fantastical worlds, and see where your imagination and AI whispers guide you.

## Features

**Genre Selection**: Choose from a variety of genres to set the stage for your adventure.
**Character Creation**: Shape your protagonist's appearance and personality traits.
**AI-powered Prompts**: Let AI nudge your creativity with narrative prompts based on your choices.
**Branching Narratives**: Each decision leads you down a unique path, shaping the story's outcome.

## Tech Stack

- [NextJS](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [tRPC](https://trpc.io/)
- [Langchain](https://js.langchain.com/v0.2/docs/introduction/)
- [Google Gemini](https://gemini.google.com/?hl=en-IN)
- [Create T3](https://create.t3.gg/)

## Setup guide

### Prerequisites

- Node.js (Download from [NodeJS](https://nodejs.org/))
- pnpm
- Google Gemini

### Setup

1. Fork repository
2. Clone the Repository:

   ```bash
   git clone https://github.com/your-username/echoes.git
   cd echoes
   ```

3. Install dependencies

   ```bash
    pnpm install
   ```

4. Create a Google Cloud Project and setup OAuth Consent Screen
5. Create OAuth app and get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
6. Get gemini api key - [Get an API key](https://ai.google.dev/gemini-api/docs/api-key?authuser=2)
7. Signup on langchain and get `LANGCHAIN_API_KEY`
8. Create `.env` and add all variables from `.env.example`
9. Run project in dev mode

   ```bash
   pnpm dev
   ```
