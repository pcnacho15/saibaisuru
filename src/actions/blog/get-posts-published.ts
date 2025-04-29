"use server";

import prisma from "@/lib/prisma";

export const getPostsPublished = async () => {
  try {
    const posts = await prisma.blog_posts.findMany({
      include: {
        post_imagenes: true,
      },
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    return posts;
  } catch (error) {
    console.log(error);
  }
};
