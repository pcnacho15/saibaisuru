"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deletePost = async (id: string) => {
  try {
    const post = await prisma.blog_posts.update({
      where: { id },
      data: {
        published: false,
      },
    });

    // Todo: RevalidatePaths
    revalidatePath("/admin/blog");
    revalidatePath(`/admin/post/${post.slug}`);
    revalidatePath(`/blog/${post.slug}`);

      return {
        ok: true,
        post
      };
  } catch (error) {
    console.log(error);
  }
};
