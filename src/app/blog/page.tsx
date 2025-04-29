import Link from "next/link";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Title } from "@/components";

// SEO
export const metadata: Metadata = {
  title: "Blog de Cultivo | Saibai Suru",
  description:
    "Aprende sobre autocultivo, germinación, sustratos y más en nuestro blog especializado para cultivadores principiantes.",
};

export default async function BlogPage() {
  const posts = await prisma.blog_posts.findMany({
    include: {
      post_imagenes: true,
    },
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <Title
        title="Blog SaibaiSuru"
        subtitle="Aprende sobre autocultivo, germinación, sustratos y más en nuestro blog especializado para cultivadores principiantes."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
          >
            <article className="fade-in bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group">
              <Image
                width={300}
                height={300}
                src={post.post_imagenes[0].url ?? ""}
                alt={`Imagen de portada de ${post.title}`}
                className="w-full h-48 object-cover object-bottom group-hover:scale-105 transition-transform"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.summary}</p>
                <span className="text-principal font-semibold group-hover:underline">
                  Leer más →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
