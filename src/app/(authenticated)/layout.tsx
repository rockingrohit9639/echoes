import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function AuthenticatedLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/auth/login");
  }

  return <div>{children}</div>;
}
