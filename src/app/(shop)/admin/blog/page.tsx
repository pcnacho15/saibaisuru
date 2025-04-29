import { Title } from "@/components";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { BlogAdminTable } from "./ui/BlogAdminTable";

export default async function BlogPage() {
  const posts = await prisma.blog_posts.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Title title="Mantenimiento de Posts" />

      <div className="flex justify-end mb-5">
        <Link
          href={"/admin/post/new"}
          className="text-center hover:bg-purple-900 bg-purple-600 rounded-md text-white hover:cursor-pointer hover:scale-105 duration-200 transition-all shadow-md p-2"
        >
          Agregar
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2">Título</th>
              <th className="py-2">Publicado</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <BlogAdminTable key={post.id} post={ post }  />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
