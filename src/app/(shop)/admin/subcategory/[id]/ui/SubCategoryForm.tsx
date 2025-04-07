"use client";

import { createUpdateSubCategory } from "@/actions/categories/create-update-subcategory";
import { Categoria, SubCategoria } from "@/interfaces/Category";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  subCategory?: SubCategoria | null;
  categories: Categoria[];
}

interface FormInputs {
  nombre: string;
  categorias_id: string;
}

export const SubCategoryForm = ({ subCategory, categories }: Props) => {
  const router = useRouter();
  // const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    // formState: { isValid },
    // getValues,
    // setValue,
    // watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...subCategory,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const subCategoryToSave = data;

    if (subCategory?.id) {
      formData.append("id", subCategory.id ?? "");
    }

    formData.append("nombre", subCategoryToSave.nombre);
    formData.append("categorias_id", subCategoryToSave.categorias_id);

    const { ok, subCateogry: updatedSubCategory } = await createUpdateSubCategory(formData);

    if (!ok) {
      alert("no se pudo actualizar la subcategoria");
      return;
    }

    router.replace(`/admin/subcategory/${updatedSubCategory?.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Nombre</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("nombre", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-5">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categorias_id", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          // type="button"
          className="btn-primary"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
