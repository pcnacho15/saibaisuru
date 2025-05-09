import { Metadata } from "next";
// import { Title } from "@/components";
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
      
      <div className="flex sm:items-center justify-center sm:gap-3 mt-7 lg:mt-14">
        <h1 className={`antialiased text-4xl font-semibold mb-3`}>
          <span className="text-principal">Saibai</span>
          <span className="text-purple-800">Suru</span>
        </h1>
      </div>
      <div
        className={`p-5 lg:p-1 relative bg-[url(/imgs/blog.png)] bg-cover bg-center rounded-xl lg:bg-none`}
      >
        <div className="block lg:hidden absolute rounded-xl inset-0 bg-black bg-opacity-45"></div>

        <h3 className="relative text-xl mb-5 text-gray-200 lg:text-black lg:text-center font-bold">
          No solo sembramos plantas. Sembramos cultura. <br /> Este blog es tu
          guía, tu parche y tu bitácora para convertirte en un cultivador de
          verdad.
        </h3>
      </div>

      <div className="mt-10">
        <h4 className="text-lg mb-5">
          🌿 Bienvenido al rincón donde el cultivo se convierte en conocimiento.
          Aquí no solo germinas semillas, también cultivas ideas, aprendes de
          tus errores y te conectas con una comunidad que vive el autocultivo
          como una forma de vida.
        </h4>
        <h4 className="text-lg mb-5">
          💬 Consejos reales, guías paso a paso y contenido sin censura, hecho
          para cultivadores que van en serio… o están por empezar.
        </h4>
        <h4 className="text-lg mb-5">
          📚 Explora nuestros artículos y haz que cada lectura te lleve un paso
          más cerca de tu mejor cosecha.
        </h4>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {posts?.map((post) => (
          <BlogItem
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </main>
  );
}
