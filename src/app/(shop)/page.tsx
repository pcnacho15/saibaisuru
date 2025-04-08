import { getFiltersProduct, getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { ProductsFilter } from "@/components/products/ProductsFilter";
import { redirect } from "next/navigation";

type SearchParams = Promise<{
  page?: string;
}>;

export default async function Home(props: { searchParams: SearchParams }) {
  const currentParams = await props.searchParams;
  const currentPage = currentParams.page ? parseInt(currentParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: currentPage,
  });

  if (products.length <= 0) {
    redirect("/");
  }

  const { tipoSemillas, tipoCultivos } = await getFiltersProduct();

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos nuestros productos"
      />
      {/* <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <ProductsFilter
          // marcas={marcas}
          // colores={colores}
          />
          <ProductGrid products={products} />
        </div>
      </div> */}

      <div className="flex mt-5  md:px-10">
        <ProductsFilter
          tipoSemillas={tipoSemillas}
          tipoCultivos={tipoCultivos}
        />
        <div className="w-full">
          <ProductGrid products={products} />
        </div>
      </div>
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
}
