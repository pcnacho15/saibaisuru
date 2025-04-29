"use client";

import { useMediaQuery } from "@/hooks";
import { Post } from "@/interfaces/Post";
import Image from "next/image";

interface Props {
  post: Post; 
}
export const HeroPost = ({ post }: Props) => {
  const isMediumUp = useMediaQuery("(min-width: 768px)");

  return (
    <div
      className={`relative bg-cover md:bg-none fade-in text-white md:text-black min-h-[60vh] flex items-center px-6 py-8 md:py-12 mt-8 rounded-xl`}
      style={{
        backgroundImage: !isMediumUp
          ? `url(${post.post_imagenes[0].url})`
          : "none",
      }}
    >
      <div className="block md:hidden absolute rounded-xl inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Textos */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 md:text-gray-700">
            {post.summary}
          </p>
        </div>

        {/* Imagen */}
        <div className="w-full hidden md:block">
          <Image
            src={post.post_imagenes[1].url ?? ""} // usa tu imagen aquí
            alt={post.title}
            className="rounded-2xl w-full h-1/3 object-cover"
            width={500}
            height={500} // ajusta el tamaño según sea necesario
            priority
          />
        </div>
      </div>
    </div>
  );
};
