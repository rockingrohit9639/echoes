import { BookPlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button, type ButtonProps } from '~/components/ui/button'
import { api } from '~/trpc/react'

type PublishStoryButtonProps = ButtonProps & {
  storyId: string
}

export default function PublishStoryButton({ storyId, ...props }: PublishStoryButtonProps) {
  const router = useRouter()

  const publishStoryMutation = api.story.publish.useMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      router.replace(`/story/${storyId}/read`)
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} icon={<BookPlusIcon />} loading={publishStoryMutation.isPending}>
          Publish Story
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Publish</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to publish your story? A final version of the story will be generated based on your
            inputs, which you can read but will no longer be able to edit. Once published, it will be visible to others.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={publishStoryMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={publishStoryMutation.isPending}
            onClick={() => {
              publishStoryMutation.mutate(storyId)
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
