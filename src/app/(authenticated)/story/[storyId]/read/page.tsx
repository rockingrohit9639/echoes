import Markdown from '~/components/markdown'
import { api } from '~/trpc/server'

type ReadStoryProps = {
  params: { storyId: string }
}

export default async function ReadStory({ params }: ReadStoryProps) {
  const story = await api.story.getFinalStoryByStoryId(params.storyId)

  return (
    <div className="p-4 md:p-10">
      <h1 className="mb-1 text-4xl font-bold md:text-6xl">{story.title}</h1>
      <p className="mb-4 md:mb-10">{story.base}</p>

      {story.finalStory?.chapters.map((chapter, i) => (
        <div key={chapter.id} className="mb-4">
          <h2 className="mb-1 text-2xl font-medium">
            Chapter {i + 1} : {chapter.title}
          </h2>

          <Markdown>{chapter.content}</Markdown>
        </div>
      ))}
    </div>
  )
}
