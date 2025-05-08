"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sleep } from "@/utils";

export const Cta = () => {
  const [load, setLoad] = useState(true);

  const router = useRouter();

  const handlleNavigation = async () => {
    setLoad(false);
    await sleep(0.5)
    // Navigate to the seeds category page
    router.push("/categories/semillas");
    setLoad(true);
  };

  return (
    <section className="relative flex justify-start items-start py-12 px-6 bg-[url(/imgs/cta-mobile.png)] xl:bg-[url(/imgs/banner-prueba.jpg)] h-auto md:min-h-[60vh] bg-cover md:bg-center text-white rounded-2xl shadow-lg mt-8">
      <div className="block absolute rounded-2xl inset-0 bg-black bg-opacity-65"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-bold">
          ¡El autocultivo también es cultura!
        </h2>
        <p className="block md:hidden my-4 text-xl">
          Cultivar es un acto de conciencia, de respeto por la planta y de
          conexión contigo mismo. 💜
        </p>
        <p className="hidden md:block my-4 w-1/2 text-lg lg:text-xl ">
          Cultivar es un acto de conciencia, de respeto por la planta y de
          conexión contigo mismo. <br />
          En Saibai Suru Grow te damos las herramientas, el conocimiento y la
          vibra para que lo hagas bien desde el primer día. <br />
          Únete a la nueva generación 420 que cultiva con pasión, con estilo y
          con propósito. 💜
        </p>
        <div className="flex gap-2 justify-start flex-wrap mb-4 text-sm text-gray-300">
          <span>#20SonLegales</span>
          <span>#Cultura420</span>
        </div>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          <button
            onClick={handlleNavigation}
            className="px-6 py-2 w-full sm:w-[35%] lg:w-[30%] 2xl:w-[25%] flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold hover:bg-gray-100 duration-200 active:scale-95 active:shadow-none transition-all"
          >
            {load ? (
              <>Ir a la tienda</>
            ) : (
              <div className="flex items-center justify-center h-6 w-6 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
