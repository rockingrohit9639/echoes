import { MongoClient } from "mongodb";
import { env } from "~/env";

/**
 * We need this additional mongodb client for langchain chat history
 */
const client = new MongoClient(env.DATABASE_URL, {
  driverInfo: { name: "langchainjs" },
});

await client.connect();

export const messagesCollection = client
  .db("echoes")
  .collection("StoryHistory");
