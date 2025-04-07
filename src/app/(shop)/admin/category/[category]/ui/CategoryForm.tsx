"use client";

import { createUpdateCategory } from "@/actions/categories/create-update-category";
import { Categoria } from "@/interfaces/Category";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  category?: Categoria | null;
}

interface FormInputs {
  nombre: string;
}

export const CategoryForm = ({ category }: Props) => {
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
      ...category
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const categoryToSave = data;

      if (category?.id) {
        formData.append("id", category.id ?? "");
      }

    formData.append("nombre", categoryToSave.nombre);
    

    const { ok, cateogry: updatedCategory } = await createUpdateCategory(
      formData
    );

    if (!ok) {
      alert("no se pudo actualizar la categoria");
      return;
    }

    router.replace(`/admin/category/${updatedCategory?.nombre}`);
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
