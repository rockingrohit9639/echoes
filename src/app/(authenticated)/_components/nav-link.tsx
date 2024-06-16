"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";
import { cn } from "~/lib/utils";
import { type BasicProps } from "~/types/basic";

type NavLinkProps = BasicProps &
  LinkProps & {
    children: string;
    icon?: React.ReactElement<{ className: string }>;
  };

export default function NavLink({
  className,
  style,
  children,
  href,
  icon,
  ...linkProps
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname.includes(href as string);

  return (
    <Link
      href={href}
      className={cn(
        "item-center flex items-center gap-2 text-primary/80",
        { "!text-primary": isActive },
        className,
      )}
      style={style}
      {...linkProps}
    >
      {icon ? cloneElement(icon, { className: "size-4" }) : null}
      {children}
    </Link>
  );
}
