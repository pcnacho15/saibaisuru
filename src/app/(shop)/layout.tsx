import { Footer } from "@/components";
import { Sidebar } from "@/components/ui/side-bar/SideBar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen">
        <TopMenu />
        <Sidebar />
        <div className="px-5 sm:px-10 mb-20 pt-16">{children}</div>
        <Footer />
      </main>
    </>
  );
}
