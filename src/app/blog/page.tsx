import { Metadata } from "next";
import { Title } from "@/components";
import { getPostsPublished } from "@/actions";
import { BlogItem } from "@/components/blog/BlogItem";

// SEO
export const metadata: Metadata = {
  title: "Blog de Cultivo | Saibai Suru",
  description:
    "Aprende sobre autocultivo, germinación, sustratos y más en nuestro blog especializado para cultivadores principiantes.",
};

export default async function BlogPage() {
  const posts = await getPostsPublished();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <Title
        title="Blog SaibaiSuru"
        subtitle="Aprende sobre autocultivo, germinación, sustratos y más en nuestro blog especializado para cultivadores principiantes."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <BlogItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
