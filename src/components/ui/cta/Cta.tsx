"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Cta = () => {
  const [load, setLoad] = useState(true);

  const router = useRouter();

  const handlleNavigation = async () => {
    setLoad(false);
    // Navigate to the seeds category page
    router.push("/categories/semillas");
    setLoad(true);
  };

  return (
    <section className="relative py-12 px-6  bg-[url(/imgs/cta-mobile.png)] md:bg-[url(/imgs/banner-cta.jpg)] bg-cover bg-bottom text-white text-center rounded-xl shadow-lg mt-8">
      <div className="block absolute rounded-xl inset-0 bg-black bg-opacity-45"></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold">
          El autocultivo también es cultura.
        </h2>
        <p className="my-4">
          Expresa tu estilo, cultiva con conciencia y haz parte de la nueva
          generación 420
        </p>
        <div className="flex gap-2 justify-center flex-wrap mb-4 text-sm text-gray-300">
          <span>#20SonLegales</span>
          <span>#Cultura420</span>
        </div>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={handlleNavigation}
            className="px-6 py-2 w-full md:w-[15%] flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold hover:bg-gray-100 duration-200 active:scale-95 active:shadow-none transition-all"
          >
            {load ? (
              <>Ir a la tienda</>
            ) : (
              <div className="flex items-center justify-center h-6 w-6 border-t-transparent border-solid animate-spin rounded-full border-[#581c87] border-4"></div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
