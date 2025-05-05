'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { sleep } from "@/utils";

export const HeroPage = () => {

  const [load, setLoad] = useState(true)

  const router = useRouter();

  const handlleNavigation = async() => {
    setLoad(false);
    await sleep(0.5)
    // Navigate to the seeds category page
    router.push("/categories/semillas");
    setLoad(true);
  }
  return (
    <section className="relative bg-[url(/imgs/hero2.png)] bg-cover bg-center lg:bg-none fade-in text-white lg:text-black min-h-[70vh] lg:min-h-[80vh] flex items-center px-6 py-8 lg:py-12 mt-8 rounded-xl">
      <div className="block lg:hidden absolute rounded-xl inset-0 bg-black bg-opacity-45"></div>

      <div className="relative z-10 lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Textos */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Un espacio creado por cultivadores para <br />
            <span className="text-principal">cultivadores</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 lg:text-gray-700">
            Desde cultivos de interior hasta exteriores, <br /> descubre nuestra
            selección de semillas premium <br />
            para que inicies tu autocultivo.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handlleNavigation}
              className="flex items-center justify-center gap-2 w-full md:w-[45%] bg-principal text-white font-semibold px-5 py-2 rounded-md shadow-md duration-200 active:scale-95 active:shadow-none transition-all"
            >
              {load ? (
                <>
                  Explorar Semillas
                  <FaSeedling size={20} />
                </>
              ) : (
                <div className="h-6 w-6 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
              )}
            </button>
            {/* <button className="text-white font-medium px-5 py-2 border border-transparent hover:underline">
              Explorar Artist Pro
            </button> */}
          </div>
        </div>

        {/* Imagen */}
        <div className="w-full hidden lg:block">
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