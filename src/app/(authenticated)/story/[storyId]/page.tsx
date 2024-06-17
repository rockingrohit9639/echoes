import { api } from "~/trpc/server";

type StoryDetailsProps = {
  params: { storyId: string };
};

export default async function StoryDetails({ params }: StoryDetailsProps) {
  const story = await api.story.findById(params.storyId);

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-3">
      <div className="col-span-full md:col-span-2 md:border-r md:border-dashed md:border-border">
        Testing
      </div>
      <div className="col-span-1 hidden p-6 md:block">
        <h1 className="mb-2 text-lg font-medium">A {story.genre} story</h1>
        <p className="text-sm">{story.base}</p>

        <div className="my-4 h-[1px] w-full border-b border-dashed border-border" />

        <p>You are {story.characterName}</p>
        <p className="text-sm">{story.characterAppearance}</p>
      </div>
    </div>
  );
}
