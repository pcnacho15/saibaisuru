"use client";

import { Categoria, SubCategoria } from "@/interfaces/Category";
import { Product } from "@/interfaces/Product";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


interface Props {
  product: Product;
  categories: Categoria[];
  subCategories: SubCategoria[];
}


// id;
// titulo;
// descripcion;
// notas;
// cantidad;
// precio;
// aroma;
// sabor;
// contenido;
// cosecha_aprox;
// subCategoria;
// descuento;
// slug;
// images;
// categorias_id;

interface FormInputs {
  titulo: string;
  slug: string;
  descripcion: string;
  notas: string;
  // aroma: string;
  precio: number;
  cantidad: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories, subCategories }: Props) => {

    const [errorMessage, setErrorMessage] = useState("");
  
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      images: undefined,
    },
  });
  
    const password = useRef({});
    // password.current = watch("password", "");
  
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
      // setErrorMessage("");
      // const { email, password, firsName, lastName } = data;
      // // server action
      // const resp = await registerUser(email, password, firsName, lastName);
      // if (!resp.ok) {
      //   setErrorMessage(resp.message);
      //   return;
      // }
      // await login(email.toLocaleLowerCase(), password);
      // window.location.replace("/");
    };

  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={2}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        {/* <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div> */}

        {/* <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200">
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div> */}

        <div className="flex flex-col mb-5">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200">
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

        <div className="flex flex-col mb-5">
          <span>Sub Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200">
            <option value="">[Seleccione]</option>
            {subCategories.map((subCategory) => (
              <option
                key={subCategory.id}
                value={subCategory.id}
              >
                {subCategory.nombre}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          {/* <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className="flex  items-center justify-center w-10 h-10 mr-2 border rounded-md"
              >
                <span>{size}</span>
              </div>
            ))}
          </div> */}

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
