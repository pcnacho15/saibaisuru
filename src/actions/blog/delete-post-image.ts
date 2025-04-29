"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deletePostImage = async (imageId: string, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar imagenes de FS",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.post_imagenes.delete({
      where: {
        id: imageId,
      },
      select: {
        post: {
          select: {
            slug: true,
          }
        }
      }
    });

    // Revalidar los paths
    revalidatePath(`/admin/blog`);
    revalidatePath(`/admin/post/${deletedImage.post.slug}`);
    revalidatePath(`/blog/${deletedImage.post.slug}`);
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
};
