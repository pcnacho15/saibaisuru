import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

type Params = Promise<{
  slug: string;
}>;

export default async function ProductPage(props: { params: Params }) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  const categories = await getCategories();

  if (!product) redirect('/admin/products')


    const title = slug === "new" ? "Agrega nuevo producto" : `Editar producto`;

  return (
    <>
        <Title title={ title } />

        <ProductForm product={ product } categories={ categories } />
    </>
  );
}
