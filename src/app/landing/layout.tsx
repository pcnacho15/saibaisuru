import { getCategories } from "@/actions";
import { Footer } from "@/components";
import { Sidebar } from "@/components/ui/side-bar/SideBar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   const categories = await getCategories();

  return (
    <>
      <main className="min-h-screen">
        <TopMenu categories={categories} />
        <Sidebar />
        <div className="px-5 sm:px-10 mb-20 pt-16">{children}</div>
        <Footer />
      </main>
    </>
  );
}
