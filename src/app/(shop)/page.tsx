// import { getPaginatedProductsWithImages } from "@/actions";
import { Featured } from "@/components/featured/Featured";
import { Benefits } from "@/components/ui/benefits/Benefits";
import { Cta } from "@/components/ui/cta/Cta";
import { HeroPage } from "@/components/ui/hero/Hero";
// import { redirect } from "next/navigation";

// type SearchParams = Promise<{
//   page?: string;
// }>;

// export default async function Home(props: { searchParams: SearchParams }) {
export default async function Home() {
  // const currentParams = await props.searchParams;
  // const currentPage = currentParams.page ? parseInt(currentParams.page) : 1;

  // const { products, totalPages } = await getPaginatedProductsWithImages({
  //   page: currentPage,
  // });

  // if (products.length <= 0) {
  //   redirect("/");
  // }

  return (
    <>
      <div className="md:mx-20">
        <HeroPage />
        <Benefits />
        <Featured />
        <Cta />
      </div>
    </>
  );
}
