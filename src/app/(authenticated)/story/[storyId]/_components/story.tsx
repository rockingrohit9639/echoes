'use client'

import { cn } from '~/lib/utils'
import { api } from '~/trpc/react'
import { type BasicProps } from '~/types/basic'
import { match } from 'ts-pattern'
import { useEffect, useRef } from 'react'
import Message from './message'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { useForm } from 'react-hook-form'
import { newMessageInput, type StoryMessageSchema, type NewMessageInput } from '~/server/api/routers/story/story.input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { SendIcon } from 'lucide-react'
import { toast } from 'sonner'
import PublishStoryButton from './publish-story-button'

type StoryProps = BasicProps & {
  id: string
}

export default function Story({ className, style, id }: StoryProps) {
  const utils = api.useUtils()
  const containerEndRef = useRef<React.ElementRef<'div'>>(null)
  const messagesContainerRef = useRef<React.ElementRef<'div'>>(null)

  const form = useForm<NewMessageInput>({
    resolver: zodResolver(newMessageInput),
    defaultValues: {
      storyId: id,
      message: '',
    },
  })

  const messagesQuery = api.story.findMessages.useQuery(id)

  const newMessageMutation = api.story.newMessage.useMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (message) => {
      utils.story.findMessages.setData(id, (prev) => {
        if (!prev) {
          return [message]
        }
        return [...prev, message]
      })
      setTimeout(scrollToBottom, 0)
    },
  })

  function handleNewMessageSubmit(input: NewMessageInput) {
    newMessageMutation.mutate(input)
    utils.story.findMessages.setData(id, (prev) => {
      const newMessage: StoryMessageSchema = {
        type: 'human',
        isInitial: false,
        data: { content: input.message },
      }

      if (!prev) {
        return [newMessage]
      }

      return [...prev, newMessage]
    })

    form.reset()
    setTimeout(scrollToBottom, 0)
  }

  function scrollToBottom() {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight + 40,
        behavior: 'smooth',
      })
    }
  }

  useEffect(
    function scrollToBottomOnLoad() {
      if (messagesQuery.status === 'success') {
        scrollToBottom()
      }
    },
    [messagesQuery.status],
  )

  return (
    <div className={cn('flex flex-col overflow-y-auto bg-dark', className)} style={style}>
      <div className="flex h-16 items-center justify-end border-b border-dashed px-6">
        <PublishStoryButton storyId={id} />
      </div>
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto rounded px-6 pt-6 scrollbar-thin scrollbar-track-background scrollbar-thumb-gray-500"
      >
        {match(messagesQuery)
          .with({ status: 'pending' }, () => (
            <div>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="mb-2 h-20 w-full animate-pulse bg-muted-foreground/20" />
              ))}
            </div>
          ))
          .with({ status: 'error' }, ({ error }) => (
            <div className="flex items-center justify-center text-error">{error.message}</div>
          ))
          .with({ status: 'success' }, ({ data: messages }) => (
            <>
              {messages
                .filter((m) => !m.isInitial)
                .map((message, i) => (
                  <Message key={i} message={message} />
                ))}

              <div ref={containerEndRef} />
              {newMessageMutation.isPending ? <p className="animate-pulse">Echo is thinking...</p> : null}
            </>
          ))
          .exhaustive()}
      </div>
      <div className="mt-4 h-16 border-t border-dashed border-border px-6 pt-4">
        <Form {...form}>
          <form className="flex gap-2" onSubmit={form.handleSubmit(handleNewMessageSubmit)}>
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
  )
}
