import { cn } from "~/lib/utils";
import { type BasicProps } from "~/types/basic";
import Sidebar from "./sidebar";

type AppShellProps = React.PropsWithChildren<BasicProps>;

export default function AppShell({
  className,
  style,
  children,
}: AppShellProps) {
  return (
    <div
      className={cn("flex h-screen w-full overflow-hidden", className)}
      style={style}
    >
      <div className="fixed inset-y-0 hidden w-64 border-r border-dashed border-border bg-background transition-all xl:block">
        <Sidebar />
      </div>
      <main className="flex w-full flex-1 flex-col overflow-auto xl:pl-64">
        {children}
      </main>
    </div>
  );
}
