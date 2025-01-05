import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { type BasicProps } from "~/types/basic";
import { PlusIcon } from "lucide-react";
import NavLink from "./nav-link";
import ThemeToggler from "./theme-toggler";
import SidebarUser from "./sidebar-user";
import SidebarStories from "./sidebar-stories";
import SignoutButton from "./signout-button";

type SidebarProps = BasicProps;

export default function Sidebar({ className, style }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between px-4 pt-6",
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

        <NavLink className="mb-4" href="/story/new" icon={<PlusIcon />}>
          new adventure
        </NavLink>

        <SidebarStories />
      </div>

      <div>
        <SidebarUser />
        <ThemeToggler className="mb-4" />
        <SignoutButton />
      </div>
    </div>
  );
}
