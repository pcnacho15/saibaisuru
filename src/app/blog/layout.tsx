// import { auth } from "@/utils";
// import { redirect } from "next/navigation";

import { getCategories } from "@/actions";
import { Footer, Sidebar, TopMenu } from "@/components";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <main className="min-h-screen">
      <TopMenu categories={categories} />
      <Sidebar />
      <div className="px-5 sm:px-10 mb-20 ">{children}</div>
      <Footer />
    </main>
  );
}
