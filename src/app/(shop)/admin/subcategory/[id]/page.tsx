import { Title } from "@/components";
import { redirect } from "next/navigation";
import { getCategories, getSubCategoryWithId } from "@/actions";
import { SubCategoryForm } from "./ui/SubCategoryForm";

type Params = Promise<{
  id: string;
}>;

export default async function ProductPage(props: { params: Params }) {
  const { id } = await props.params;

  const subCategoryBD = await getSubCategoryWithId({ id });
  const categories = await getCategories();

  // Todo: new
  if (!subCategoryBD && id !== "new") {
    redirect("/admin/subcategories");
  }


  const title = id === "new" ? "Agrega nueva subcategoria" : `Editar subcategoria`;

  return (
    <>
      <Title title={title} />

      <SubCategoryForm subCategory={subCategoryBD} categories={categories} />
    </>
  );
}
