"use client";

import { createUpdateProduct } from "@/actions/product/create-update-products";
import { deleteProductImage } from "@/actions/product/delete-product-image";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Categoria, SubCategoria } from "@/interfaces/Category";
import {
  Product,
  producto_imagenes as ProductWithImage,
} from "@/interfaces/Product";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { producto_imagenes?: ProductWithImage[] };
  categories: Categoria[];
  subCategories: SubCategoria[];
}

interface FormInputs {
  titulo: string;
  slug: string;
  descripcion: string;
  notas: string | null;
  // aroma: string;
  precio: number;
  cantidad: number;
  contenido: number | null;
  cosecha_aprox: string | null;
  descuento: number | null;
  categorias_id: string;
  sub_categorias_id: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories, subCategories }: Props) => {
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
      ...product,
      images: undefined,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("titulo", productToSave.titulo);
    formData.append("slug", productToSave.slug);
    formData.append("descripcion", productToSave.descripcion);
    formData.append("precio", productToSave.precio.toString());
    formData.append("cantidad", productToSave.cantidad.toString());
    formData.append("notas", productToSave.notas ?? "");
    formData.append("contenido", productToSave.contenido?.toString() ?? "");
    formData.append(
      "cosecha_aprox",
      productToSave.cosecha_aprox?.toString() ?? ""
    );
    formData.append("descuento", productToSave.descuento?.toString() ?? "");
    formData.append("categorias_id", productToSave.categorias_id);
    formData.append("sub_categorias_id", productToSave.sub_categorias_id);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Producto no se pudo actualizar");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("titulo", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={4}
            className="p-2 border rounded-md bg-gray-200"
            {...register("descripcion", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Notas</span>
          <textarea
            rows={4}
            className="p-2 border rounded-md bg-gray-200"
            {...register("notas", { required: false })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("precio", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Cantidad</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("cantidad", { required: true, min: 1 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Contenido</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("contenido", { required: false })}
          />
        </div>

        <button
          // type="button"
          className="btn-primary w-full"
        >
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <div className="flex flex-col mb-2">
            <span>Cosecha aproximada</span>
            <textarea
              rows={2}
              className="p-2 border rounded-md bg-gray-200"
              {...register("cosecha_aprox", { required: false })}
            ></textarea>
          </div>

          <div className="flex flex-col mb-2">
            <span>Descuento</span>
            <input
              type="number"
              className="p-2 border rounded-md bg-gray-200"
              {...register("descuento", { required: false })}
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

          <div className="flex flex-col mb-5">
            <span>Sub Categoria</span>
            <select
              className="p-2 border rounded-md bg-gray-200"
              {...register("sub_categorias_id", { required: true })}
            >
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

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              {...register("images")}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 grow">
            {product.producto_imagenes?.map((image) => (
              <div
                key={image.id}
                className="flex flex-col justify-end"
              >
                <ProductImage
                  alt={product.titulo ?? ""}
                  src={image.url}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />

                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
