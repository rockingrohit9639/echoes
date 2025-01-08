'use client'

import { useMutation } from '@tanstack/react-query'
import { CircleStopIcon, PauseCircleIcon, Volume2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Markdown from '~/components/markdown'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { type StoryMessageSchema } from '~/server/api/routers/story/story.input'
import { type BasicProps } from '~/types/basic'
import axios from 'axios'
import { useStore } from '~/store'

type MessageProps = BasicProps & {
  message: StoryMessageSchema
}

export default function Message({ className, style, message }: MessageProps) {
  const [audio, setAudio] = useState<HTMLAudioElement>()

  const isSpeaking = useStore((store) => store.isSpeaking)
  const setIsSpeaking = useStore((store) => store.setIsSpeaking)

  const speechMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await axios.post<Blob>('/api/tts', { text }, { responseType: 'blob' })
      return response.data
    },
    onSuccess: async (data) => {
      const audio = new Audio(URL.createObjectURL(data))
      audio.onended = () => {
        setIsSpeaking(false)
      }

      await audio.play().then(() => {
        setIsSpeaking(true)
      })

      setAudio(audio)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  async function speak() {
    // If it is already speaking then pause it.
    if (isSpeaking) {
      handlePause()
      return
    }

    // If it is not speaking but Audio is present and resume
    if (audio) {
      await handleResume()
      return
    }

    speechMutation.mutate(message.data.content)
  }

  async function handleResume() {
    if (audio) {
      await audio.play()
      setIsSpeaking(true)
    }
  }

  function handlePause() {
    if (audio) {
      audio.pause()
    }

    setIsSpeaking(false)
  }

  async function handleStop() {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setIsSpeaking(false)
  }

  return (
    <div className={cn('mb-4 flex flex-col gap-1', className)} style={style}>
      <p className="mb-1 text-sm text-muted-foreground">{message.type === 'human' ? 'You' : 'Echo'}</p>

      <Markdown className="w-full">{message.data.content}</Markdown>

      {message.type === 'ai' ? (
        <div className="flex items-center gap-1">
          <Button
            icon={isSpeaking ? <PauseCircleIcon /> : <Volume2Icon />}
            size="icon-sm"
            variant="link"
            className="h-5 w-5 p-0 text-muted-foreground"
            onClick={speak}
            loading={speechMutation.isPending}
          />

          {isSpeaking ? (
            <Button
              icon={<CircleStopIcon />}
              size="icon-sm"
              variant="link"
              className="h-5 w-5 p-0 text-muted-foreground"
              onClick={handleStop}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
