"use client";

import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { type BasicProps } from "~/types/basic";

type SidebarUserProps = BasicProps;

export default function SidebarUser({ className, style }: SidebarUserProps) {
  const { data, status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className={cn("h-12 w-full animate-pulse bg-muted", className)} />
    );
  }

  return (
    <div
      className={cn(
        "w-full border-y border-dashed border-border py-4",
        className,
      )}
      style={style}
    >
      {data.user.name}
    </div>
  );
}
