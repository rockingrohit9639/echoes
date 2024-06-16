"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { type BasicProps } from "~/types/basic";
import { LogOutIcon, PlusIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {} from "next";
import NavLink from "./nav-link";

type SidebarProps = BasicProps;

export default function Sidebar({ className, style }: SidebarProps) {
  const { data, status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className="flex h-full flex-col justify-between px-4 py-5">
        <div className="bg-muted size-8 animate-pulse rounded-full" />

        <div>
          <div className="bg-muted mb-4 h-10 w-full animate-pulse" />
          <div className="bg-muted h-10 w-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between px-4 py-6",
        className,
      )}
      style={style}
    >
      <div>
        <Link href="/" className="mb-8 block">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="w-8 object-contain grayscale hover:grayscale-0"
          />
        </Link>

        <NavLink href="/story/new" icon={<PlusIcon />}>
          new story
        </NavLink>
      </div>

      <div>
        <div className="mb-4 w-full border-y border-dashed border-border py-4">
          {data.user.name}
        </div>

        <button
          className="flex w-full items-center gap-2 border-b border-dashed border-border pb-4 opacity-60 hover:opacity-100"
          onClick={async () => {
            await signOut();
          }}
        >
          <LogOutIcon className="size-4" />
          logout
        </button>
      </div>
    </div>
  );
}
