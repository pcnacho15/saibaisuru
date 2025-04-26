'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSeedling } from "react-icons/fa";

export const HeroPage = () => {

  const router = useRouter();

  const handlleNavigation = () => {
    // Navigate to the seeds category page
    router.push("/categories/semillas");

  }
  return (
    <section className="relative bg-[url(/imgs/hero2.png)] bg-cover bg-center md:bg-none fade-in text-white md:text-black min-h-[70vh] md:min-h-[80vh] flex items-center px-6 py-8 md:py-12 mt-8 rounded-xl">
      <div className="block md:hidden absolute rounded-xl inset-0 bg-black bg-opacity-45"></div>

      <div className="relative z-10 md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Textos */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Un espacio creado por cultivadores para <br />
            <span className="text-principal">cultivadores</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 md:text-gray-700">
            Desde cultivos de interior hasta exteriores, <br /> descubre nuestra
            selección de semillas premium <br />
            para que inicies tu autocultivo.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handlleNavigation}
              className="flex items-center gap-1 bg-principal text-white font-semibold px-5 py-2 rounded-md shadow-md duration-200 active:scale-95 active:shadow-none transition-all"
            >
              Explorar Semillas
              <FaSeedling size={20} />
            </button>
            {/* <button className="text-white font-medium px-5 py-2 border border-transparent hover:underline">
              Explorar Artist Pro
            </button> */}
          </div>
        </div>

        {/* Imagen */}
        <div className="w-full hidden md:block">
          <Image
            src="/imgs/hero.png" // usa tu imagen aquí
            alt="Artista"
            className="rounded-2xl w-full object-cover"
            width={500}
            height={500} // ajusta el tamaño según sea necesario
            priority
          />
        </div>
      </div>
    </section>
  );
};