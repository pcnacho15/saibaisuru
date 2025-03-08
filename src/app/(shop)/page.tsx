import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const currentParams = await searchParams;
  const currentPage = currentParams.page ? parseInt(currentParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: currentPage,
  });

  if (products.length <= 0) {
    redirect("/");
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos nuestros productos"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="w-full md:w-3/4">
          <ProductGrid products={products} />
        </div>
      </div>
    </>
  );
}
