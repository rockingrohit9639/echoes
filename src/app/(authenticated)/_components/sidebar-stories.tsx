"use client";

import { api } from "~/trpc/react";
import { type BasicProps } from "~/types/basic";
import NavLink from "./nav-link";
import { cn } from "~/lib/utils";

type SidebarStoriesProps = BasicProps;

export default function SidebarStories({
  className,
  style,
}: SidebarStoriesProps) {
  const storiesQuery = api.story.findAll.useQuery();

  return (
    <div className={cn("flex flex-col gap-2", className)} style={style}>
      {storiesQuery.status === "success"
        ? storiesQuery.data.map((story) => (
            <NavLink
              key={story.id}
              href={`/story/${story.id}${story.isCompleted ? "/read" : ""}`}
              className="text-ellipsis text-sm"
            >
              {story.title}
            </NavLink>
          ))
        : null}
    </div>
  );
}
