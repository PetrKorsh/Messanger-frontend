import { getSession } from "@/enteties/get-session/get-session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session.auth) {
    redirect("/login");
  }
  return (
    <>
      <main className="flex h-full flex-grow flex-col">{children}</main>
    </>
  );
}
