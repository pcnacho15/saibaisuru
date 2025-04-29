import { Post } from '@/interfaces/Post';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    post: Post
}

export const BlogItem = ({ post }: Props) => {
  return (
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
  );
}
