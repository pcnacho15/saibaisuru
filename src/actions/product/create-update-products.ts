"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { productos } from "@prisma/client";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");


const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  titulo: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  descripcion: z.string(),
  notas: z.string(),
  cosecha_aprox: z.string().optional(),
  precio: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  cantidad: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  contenido: z.coerce
    .number()
    .optional()
    .transform((val) => Number(val?.toFixed(0))),
  descuento: z.coerce
    .number()
    .optional()
    .transform((val) => Number(val?.toFixed(0))),
  categorias_id: z.string().uuid(),
  sub_categorias_id: z.string().uuid(),
});





export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
      console.log(productParsed.error);
      return { ok: false };
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

    product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

    const { id, ...rest } = product;

    try {
      const prismaTx = await prisma.$transaction(async (tx) => {
        let product: productos;
        if (id) {
          // Actualizar
          product = await tx.productos.update({
            where: { id },
            data: {
              ...rest,
            },
          });
        } else {
          // Crear
          product = await tx.productos.create({
            data: {
              ...rest,
            },
          });
        }

        // Proceso de carga y guardado de imagenes
        // Recorrer las imagenes y guardarlas
        if (formData.getAll("images")) {
          // [https://url.jpg, https://url.jpg]
          const images = await uploadImages(formData.getAll("images") as File[]);
          if (!images) {
            throw new Error("No se pudo cargar las imágenes, rollingback");
          }

          await tx.producto_imagenes.createMany({
            data: images.map((image) => ({
              url: image!,
              productos_id: product.id,
            })),
          });
        }

        return {
          product,
        };
      });

      // Todo: RevalidatePaths
      revalidatePath("/admin/products");
      revalidatePath(`/admin/product/${product.slug}`);
      revalidatePath(`/products/${product.slug}`);

      return {
        ok: true,
        product: prismaTx.product,
      };
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        message: "Revisar los logs, no se pudo actualizar/crear",
      };
    }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
