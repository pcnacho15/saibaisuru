// import { auth } from "@/utils";
// import { redirect } from "next/navigation";

import { Footer, Sidebar, TopMenuSale } from "@/components";


export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // if (!session?.user) {
  //   // redirect('/auth/login?returnTo=/perfil');
  //   redirect("/auth/login?redirectTo=/checkout/address");
  // }

  return (
    <>
      <TopMenuSale />
      <Sidebar />
      <div className="w-full md:w-3/4 m-auto">{children}</div>
      <Footer />
    </>
  );
}
