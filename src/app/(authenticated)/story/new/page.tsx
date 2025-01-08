'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { api } from '~/trpc/react'
import { newStoryInput, type NewStoryInput } from '~/server/api/routers/story/story.input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function NewStory() {
  const router = useRouter()

  const utils = api.useUtils()

  const form = useForm<NewStoryInput>({
    resolver: zodResolver(newStoryInput),
    defaultValues: {
      genre: '',
      storyBase: '',
      characterName: '',
      characterAppearance: '',
    },
  })

  const newStoryMutation = api.story.new.useMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async (storyCreated) => {
      await utils.story.findAll.invalidate()
      router.replace(`/story/${storyCreated.id}`)
      toast.success('The world awaits. Let your story unfold.')
    },
  })

  const randomStoryMutation = api.story.startRandomStory.useMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async (storyCreated) => {
      await utils.story.findAll.invalidate()
      router.replace(`/story/${storyCreated.id}`)
      toast.success('The world awaits. Let your story unfold.')
    },
  })

  return (
    <div className="p-6">
      <h1 className="mb-8 text-2xl font-bold">Craft your next adventure</h1>

      <div className="mb-4 flex items-center justify-end border-b border-dashed border-border pb-4">
        <Button
          disabled={randomStoryMutation.isPending || newStoryMutation.isPending}
          loading={randomStoryMutation.isPending}
          onClick={() => {
            randomStoryMutation.mutate()
          }}
        >
          ✨ Surprise me
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((input) => {
            newStoryMutation.mutate(input)
          })}
        >
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., fantasy" {...field} />
                </FormControl>
                <FormDescription>
                  Choose your genre: Dive into a world of fantasy, unravel a thrilling mystery, explore the cosmos in
                  sci-fi, or embark on a romantic adventure
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storyBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Story base</FormLabel>
                <FormControl>
                  <Textarea placeholder="A forgotten forest..." rows={5} {...field} />
                </FormControl>
                <FormDescription>Write the base of your story</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="my-4 border-y border-dashed border-border py-4">Who Will You Be?</div>

          <FormField
            control={form.control}
            name="characterName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Character name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="characterAppearance"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Appearance</FormLabel>
                <FormControl>
                  <Textarea placeholder="Let others see you" rows={5} {...field} />
                </FormControl>
                <FormDescription>Briefly describe your character&apos;s appearance.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={randomStoryMutation.isPending || newStoryMutation.isPending}
            loading={newStoryMutation.isPending}
          >
            Start Your Story!
          </Button>
        </form>
      </Form>
    </div>
  )
}
