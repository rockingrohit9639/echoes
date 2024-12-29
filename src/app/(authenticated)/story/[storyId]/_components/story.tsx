"use client";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type BasicProps } from "~/types/basic";
import { match } from "ts-pattern";
import { useEffect, useRef } from "react";
import Message from "./message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import {
  newMessageInput,
  type StoryMessageSchema,
  type NewMessageInput,
} from "~/server/api/routers/story/story.input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { SendIcon } from "lucide-react";
import { toast } from "sonner";

type StoryProps = BasicProps & {
  id: string;
};

export default function Story({ className, style, id }: StoryProps) {
  const utils = api.useUtils();
  const messagesContainerRef = useRef<React.ElementRef<"div">>(null);

  const form = useForm<NewMessageInput>({
    resolver: zodResolver(newMessageInput),
    defaultValues: {
      storyId: id,
      message: "",
    },
  });

  const messagesQuery = api.story.findMessages.useQuery(id);

  const newMessageMutation = api.story.newMessage.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (message) => {
      utils.story.findMessages.setData(id, (prev) => {
        if (!prev) {
          return [message];
        }
        return [...prev, message];
      });
    },
  });

  function handleNewMessageSubmit(input: NewMessageInput) {
    newMessageMutation.mutate(input);
    utils.story.findMessages.setData(id, (prev) => {
      const newMessage: StoryMessageSchema = {
        type: "human",
        isInitial: false,
        data: { content: input.message },
      };

      if (!prev) {
        return [newMessage];
      }

      return [...prev, newMessage];
    });

    form.reset();
  }

  useEffect(function scrollMessageIntoView() {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.addEventListener(
        "DOMNodeInserted",
        (event) => {
          const target = event.currentTarget as HTMLDivElement;

          if (target) {
            target.scroll({ top: target.scrollHeight, behavior: "smooth" });
          }
        },
      );
    }
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col overflow-y-auto bg-dark px-6 pt-6",
        className,
      )}
      style={style}
    >
      <div
        ref={messagesContainerRef}
        className="hide-scrollbar flex-1 overflow-y-auto"
      >
        {match(messagesQuery)
          .with({ status: "pending" }, () => (
            <div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="mb-2 h-20 w-full animate-pulse bg-muted-foreground/10"
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
            <>
              {messages
                .filter((m) => !m.isInitial)
                .map((message, i) => (
                  <Message key={i} message={message} />
                ))}

              {newMessageMutation.isPending ? (
                <p className="animate-pulse">Echo is thinking...</p>
              ) : null}
            </>
          ))
          .exhaustive()}
      </div>
      <div className="mt-4 h-16 border-t border-dashed border-border pt-4">
        <Form {...form}>
          <form
            className="flex gap-2"
            onSubmit={form.handleSubmit(handleNewMessageSubmit)}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      disabled={newMessageMutation.isPending}
                      placeholder="What's your move ?"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              icon={<SendIcon />}
              disabled={newMessageMutation.isPending}
              loading={newMessageMutation.isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
