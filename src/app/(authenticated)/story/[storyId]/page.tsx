import { api } from "~/trpc/server";
import Story from "./_components/story";

type StoryDetailsProps = {
  params: { storyId: string };
};

export default async function StoryDetails({ params }: StoryDetailsProps) {
  const story = await api.story.findById(params.storyId);

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-4">
      <Story
        id={story.id}
        className="col-span-full overflow-hidden md:col-span-3 md:border-r md:border-dashed md:border-border"
      />

      <div className="col-span-1 hidden p-6 md:block">
        <h1 className="mb-4 text-2xl font-bold">{story.title}</h1>

        <h2 className="mb-2 text-lg font-medium">A {story.genre} story</h2>
        <p className="text-sm">{story.base}</p>

        <div className="my-4 h-[1px] w-full border-b border-dashed border-border" />

        <p>You are {story.characterName}</p>
        <p className="text-sm">{story.characterAppearance}</p>
      </div>
    </div>
  );
}
