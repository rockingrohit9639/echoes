"use client";

import { CircleStopIcon, Volume2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Markdown from "~/components/markdown";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { type StoryMessageSchema } from "~/server/api/routers/story/story.input";
import { type BasicProps } from "~/types/basic";

type MessageProps = BasicProps & {
  message: StoryMessageSchema;
};

export default function Message({ className, style, message }: MessageProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  function speak() {
    if ("speechSynthesis" in window) {
      if (window.speechSynthesis.speaking) {
        toast.info("Please wait for speaker to finish.");
      }

      const utterance = new SpeechSynthesisUtterance(message.data.content);
      window.speechSynthesis.speak(utterance);

      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      toast.error("Text-to-speech is not supported in this browser.");
    }
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  return (
    <div className={cn("mb-4 flex flex-col gap-1", className)} style={style}>
      <p className="mb-1 text-sm text-muted-foreground">
        {message.type === "human" ? "You" : "Echo"}
      </p>

      <Markdown className="w-full">{message.data.content}</Markdown>

      {message.type === "ai" ? (
        <div className="flex items-center gap-1">
          <Button
            icon={<Volume2Icon />}
            size="icon-sm"
            variant="link"
            className="h-5 w-5 p-0 text-muted-foreground"
            onClick={speak}
            disabled={isSpeaking}
          />

          {isSpeaking ? (
            <Button
              icon={<CircleStopIcon />}
              size="icon-sm"
              variant="link"
              className="h-5 w-5 p-0 text-muted-foreground"
              onClick={stopSpeaking}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
