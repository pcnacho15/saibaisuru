import { Title } from "@/components";
import { redirect } from "next/navigation";
import { PostForm } from "./ui/PostForm";
import prisma from "@/lib/prisma";

type Params = Promise<{
  slug: string;
}>;

export default async function ProductPage(props: { params: Params }) {
   const { slug } = await props.params;

  const post = await prisma.blog_posts.findUnique({
    include: {
      post_imagenes: true,
    },
    where: { slug},
  }); 

  if (!post && slug !== "new") {
    redirect("/admin/blog");
  }


  const title =
    slug === "new" ? "Crea un nuevo post" : `Editar post`;

  return (
    <>
      <Title title={title} />

      <PostForm post={post ?? {}} />
    </>
  );
}
