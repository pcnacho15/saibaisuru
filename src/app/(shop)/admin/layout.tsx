import { auth } from "@/utils";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
