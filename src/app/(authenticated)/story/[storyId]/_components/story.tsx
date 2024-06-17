"use client";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type BasicProps } from "~/types/basic";
import { match } from "ts-pattern";
import { useRef } from "react";
import Message from "./message";

type StoryProps = BasicProps & {
  id: string;
};

export default function Story({ className, style, id }: StoryProps) {
  const messageContainerRef = useRef<React.ElementRef<"div">>(null);

  const messagesQuery = api.story.findMessages.useQuery(id);

  return (
    <div
      className={cn(
        "flex flex-col overflow-y-auto bg-dark px-6 pt-6",
        className,
      )}
      style={style}
    >
      <div ref={messageContainerRef} className="flex-1">
        {match(messagesQuery)
          .with({ status: "pending" }, () => (
            <div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="mb-2 h-8 w-full animate-pulse bg-muted-foreground/10"
                />
              ))}
            </div>
          ))
          .with({ status: "error" }, ({ error }) => (
            <div className="flex items-center justify-center text-error">
              {error.message}
            </div>
          ))
          .with({ status: "success" }, ({ data: messages }) => (
            <div className="flex h-full flex-col justify-end overflow-y-auto">
              {messages
                .filter((message) => message.from !== "system")
                .map((message) => (
                  <Message key={message.id} message={message} />
                ))}
            </div>
          ))
          .exhaustive()}
      </div>
      <div className="mt-4 h-16 border-t border-dashed border-border pt-4">
        Input
      </div>
    </div>
  );
}
