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
    // <main className="relative min-h-screen flex justify-center items-center bg-[radial-gradient(#e5e7eb_2px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] px-5">
    <main className="relative min-h-screen flex justify-center items-center [background:radial-gradient(125%_125%_at_50%_10%,#f3f4f6_45%,#63e_100%)] px-5">
      {children}
    </main>
  );
}
