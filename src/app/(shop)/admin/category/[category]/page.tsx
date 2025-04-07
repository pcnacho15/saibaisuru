import { Title } from "@/components";
import { redirect } from "next/navigation";
import { getCategoryWithId } from "@/actions";
import { CategoryForm } from "./ui/CategoryForm";

type Params = Promise<{
  category: string;
}>;

export default async function ProductPage(props: { params: Params }) {
  const { category } = await props.params;

  const categoryBD = await getCategoryWithId({ category });

  // Todo: new
  if (!categoryBD && category !== "new") {
    redirect("/admin/categories");
  }


  const title =
    category === "new" ? "Agrega nueva categoria" : `Editar categoria`;

  return (
    <>
      <Title title={title} />

      <CategoryForm category={categoryBD} />
    </>
  );
}
