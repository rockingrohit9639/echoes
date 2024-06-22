import Markdown from "~/components/markdown";
import { cn } from "~/lib/utils";
import { type StoryMessageSchema } from "~/server/api/routers/story/story.input";
import { type BasicProps } from "~/types/basic";

type MessageProps = BasicProps & {
  message: StoryMessageSchema;
};

export default function Message({ className, style, message }: MessageProps) {
  return (
    <div className={cn("mb-4 flex flex-col gap-1", className)} style={style}>
      <p className="mb-1 text-sm text-muted-foreground">
        {message.from === "human" ? "You" : "Echo"}
      </p>

      <Markdown className="w-full">{message.data.content}</Markdown>
    </div>
  );
}
