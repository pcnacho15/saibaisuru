import { auth } from "@/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-loginImg bg-no-repeat bg-cover bg-top">
      {children}
    </main>
  );
}
