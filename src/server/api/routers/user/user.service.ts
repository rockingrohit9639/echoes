import { type User } from "next-auth";
import { getUserWelcomePrompt } from "./user.prompt";
import { TRPCError } from "@trpc/server";
import { gemini } from "~/lib/gemini";
import { type PrismaClient } from "@prisma/client";

export async function welcomeUser(user: User, db: PrismaClient) {
  try {
    const dbUser = await db.user.findFirst({ where: { id: user.id } });
    if (typeof dbUser?.welcomeMessage === "string") {
      return dbUser.welcomeMessage;
    }

    const prompt = getUserWelcomePrompt(user?.name);
    const res = await gemini.invoke(prompt);

    const welcomeMessage = res.content as string;

    await db.user.update({
      where: { id: user.id },
      data: { welcomeMessage },
    });

    return welcomeMessage;
  } catch (cause) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
      cause,
    });
  }
}
