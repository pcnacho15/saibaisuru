import { getCategoryWithId, getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function ({ params, searchParams }: Props) {
  const { category } = await params;
  const categoryDB = await getCategoryWithId({ category });
  if (!categoryDB) notFound();
  

  const currentParams = await searchParams;
  const page = currentParams.page ? parseInt(currentParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    categoryId: categoryDB.id,
  });


  const labels: Record<string, string> = {
    semillas: "Semillas",
    esquejes: "Esquejes",
    cultivo: "Cultivo",
  };

  return (
    <>
      <Title
        title={
           `${labels[categoryDB.nombre]}`
        }
        subtitle={
          category
        }
      />

      <div className="flex flex-col items-center justify-center">
        <div className="w-full md:w-3/4">
          <ProductGrid products={products} />
        </div>
      </div>
      {/* <Pagination totalPages={totalPages} /> */}
    </>
  );
}
