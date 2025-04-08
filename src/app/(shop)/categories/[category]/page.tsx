import { getCategoryWithId, getFiltersProduct, getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { ProductsFilter } from "@/components/products/ProductsFilter";
import { notFound } from "next/navigation";

type Params = Promise<{
  category: string;
}>;

type SearchParams = Promise<{
  page?: string;
}>;

export default async function CategoryPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { category } = await props.params;
  const categoryDB = await getCategoryWithId({ category });
  if (!categoryDB) notFound();

  const currentParams = await props.searchParams;
  const page = currentParams.page ? parseInt(currentParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    categoryId: categoryDB.id,
  });

  const labels: Record<string, string> = {
    semillas: "Semillas",
    // esquejes: "Esquejes",
    kits: "Kits",
    cultivo: "Cultivo",
  };

   const { tipoSemillas, tipoCultivos } = await getFiltersProduct();

  return (
    <>
      <Title
        title={`${labels[categoryDB.nombre]}`}
        subtitle={category}
      />

      <div className="flex gap-12 mt-5">
        {/* {
          products.length > 0 ? ( */}

        <ProductsFilter
          tipoSemillas={tipoSemillas}
          tipoCultivos={tipoCultivos}
          // tipoKits={tipoKits}
          category={category}
        />
        {/* )
          : ''
        } */}
        <div className="w-full">
          <ProductGrid products={products} />
        </div>
      </div>
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
}
