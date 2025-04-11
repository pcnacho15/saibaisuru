"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: string, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar imagenes de FS",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.producto_imagenes.delete({
      where: {
        id: imageId,
      },
      select: {
        producto: {
          select: {
            slug: true,
          },
        },
      },
    });

    // Revalidar los paths
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedImage.producto.slug}`);
    revalidatePath(`/product/${deletedImage.producto.slug}`);
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
};
