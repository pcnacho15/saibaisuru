import { getCategories, getProductBySlug, getSubCategories } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

type Params = Promise<{
  slug: string;
}>;

export default async function ProductPage(props: { params: Params }) {
  const { slug } = await props.params;

  const [product, categories, subCategories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
    getSubCategories(),
  ]);

  // Todo: new
  if (!product && slug !== "new") {
    redirect("/admin/products");
  }


  const title = slug === "new" ? "Agrega nuevo producto" : `Editar producto`;

  return (
    <>
      <Title title={title} />

      <ProductForm
        product={product ?? {}}
        categories={categories}
        subCategories={subCategories}
      />
    </>
  );
}
