import Markdown from "~/components/markdown";
import { api } from "~/trpc/server";

export default async function Home() {
  const welcomeMessage = await api.user.welcome();
  return (
    <div className="prose pt-6 !text-primary md:max-w-screen-sm">
      <Markdown>{welcomeMessage}</Markdown>
    </div>
  );
}
