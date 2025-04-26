'use client';
import { useRouter } from "next/navigation";

export const Cta = () => {
  const router = useRouter();

  const handlleNavigation = () => {
    // Navigate to the seeds category page
    router.push("/categories/semillas");

  }

  return (
    <section className="py-12 px-6 bg-[#581c87] text-white text-center rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold">
        ¿Listo para comenzar tu propio cultivo?
      </h2>
      <p className="my-4">
        Elige tus semillas, recibe asesoría y haz parte del mundo del
        autocultivo.
      </p>
      <div className="flex gap-2 justify-center flex-wrap mb-4 text-sm text-gray-300">
        <span>#20SonLegales</span>
        <span>#Cultura420</span>
      </div>
      <button
        onClick={handlleNavigation}
        className="px-6 py-2 rounded-xl bg-white text-[#581c87] font-bold hover:bg-gray-100 duration-200 active:scale-95 active:shadow-none transition-all"
      >
        Ir a la tienda
      </button>
    </section>
  );
};
