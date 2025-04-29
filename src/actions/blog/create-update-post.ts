"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { blog_posts } from "@prisma/client";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const postSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  summary: z.string(),
  content: z.string(),
});

export const createUpdatePost = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const postParsed = postSchema.safeParse(data);

  if (!postParsed.success) {
    console.log(postParsed.error);
    return { ok: false };
  }

  const post = postParsed.data;
  post.slug = post.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = post;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let posts: blog_posts;
      if (id) {
        // Actualizar
        posts = await tx.blog_posts.update({
          where: { id },
          data: {
            ...rest,
          },
        });
      } else {
        // Crear
        posts = await tx.blog_posts.create({
          data: {
            ...rest,
          },
        });
      }


      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("No se pudo cargar las imágenes, rollingback");
        }
        await tx.post_imagenes.createMany({
          data: images.map((image) => ({
            url: image!,
            post_id: posts.id,
          })),
        });
      }

      return {
        posts,
      };
    });

    // Todo: RevalidatePaths
    revalidatePath("/admin/blog");
    revalidatePath(`/admin/post/${post.slug}`);
    revalidatePath(`/blog/${post.slug}`);

    return {
      ok: true,
      post: prismaTx.posts,
    };
  } catch (error) {
    console.log(error);
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
