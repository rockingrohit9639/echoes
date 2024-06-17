import { type Message } from "@prisma/client";
import { cn } from "~/lib/utils";
import { type BasicProps } from "~/types/basic";

type MessageProps = BasicProps & {
  message: Message;
};

export default function Message({ className, style, message }: MessageProps) {
  return (
    <div className={cn("mb-4 flex flex-col gap-1", className)} style={style}>
      <p className="mb-1 text-sm text-muted-foreground">
        {message.from === "human" ? "You" : "Echo"}
      </p>

      <p>{message.content}</p>
    </div>
  );
}
