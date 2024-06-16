import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import AppShell from "./_components/app-shell";

export default async function AuthenticatedLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/auth/login");
  }

  return <AppShell>{children}</AppShell>;
}
