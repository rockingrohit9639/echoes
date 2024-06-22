import Link from "next/link";
import Markdown from "~/components/markdown";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";

export default async function Home() {
  const welcomeMessage = await api.user.welcome();
  return (
    <div className="prose p-6 !text-primary md:max-w-screen-sm">
      <Markdown className="mb-4">{welcomeMessage}</Markdown>

      <Link
        href="/story/new"
        className={cn(buttonVariants({ variant: "default" }), "no-underline")}
      >
        Start your next adventure
      </Link>
    </div>
  );
}
