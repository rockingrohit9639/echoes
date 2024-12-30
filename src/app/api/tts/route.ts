import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env";
import textToSpeech from "@google-cloud/text-to-speech";
import { getServerAuthSession } from "~/server/auth";

const validationSchema = z.object({
  text: z.string(),
});

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const data = (await request.json()) as unknown;

  const parsedResponse = await validationSchema.safeParseAsync(data);
  if (!parsedResponse.success) {
    return NextResponse.json(
      { success: false, message: "Invalid payload" },
      { status: 400 },
    );
  }

  const client = new textToSpeech.TextToSpeechClient({
    apiKey: env.GOOGLE_CLOUD_API_KEY,
  });

  const [response] = await client.synthesizeSpeech({
    input: { text: parsedResponse.data.text },
    voice: {
      languageCode: "en-US",
      ssmlGender: "MALE",
      name: "en-US-Standard-J",
    },
    audioConfig: { audioEncoding: "MP3", pitch: -10, speakingRate: 1 },
  });

  if (!response.audioContent) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse(response.audioContent);
}
