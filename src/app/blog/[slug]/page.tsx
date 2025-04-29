// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import { HeroPost } from "./ui/HeroPost";

type Params = Promise<{
  slug: string;
}>;


// SEO dinámico
export async function generateMetadata(props: { params: Params }): Promise<Metadata> {

  const { slug } = await props.params;

  const post = await prisma.blog_posts.findUnique({
    where: { slug: slug },
  });

  if (!post) {
    return { title: "Artículo no encontrado | Saibai Suru" };
  }

  return {
    title: `${post.title} | Saibai Suru`,
    description: post.summary,
    openGraph: {
      images: [{ url: post.coverImage ?? "" }],
    },
  };
}

export default async function BlogPostPage(props: { params: Params }) {

  const { slug } = await props.params;

  const post = await prisma.blog_posts.findUnique({
    include: {
      post_imagenes: true,
    },
    where: { slug: slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <main>
      <HeroPost post={post} />
      <article className="prose prose-lg max-w-none mx-auto px-4 py-8">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
