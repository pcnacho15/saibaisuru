'use client'

import { useEffect, useState } from "react";

export default function AgeGateModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("isOfAge");
    if (!hasAccepted) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("isOfAge", "true");
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-3xl animate-fade-in overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
          ¿Eres mayor de edad?
        </h2>
        <p className="text-sm sm:text-base mb-6 text-justify text-gray-700">
          El contenido de <strong>saibaisuru.com</strong> está dirigido
          exclusivamente a <strong>mayores de edad (18+ años)</strong>.
          <br />
          <br />
          Todos los productos ofrecidos en esta tienda están destinados
          únicamente para{" "}
          <strong>
            uso educativo, de colección, investigación botánica o conservación
            genética
          </strong>
          . No promovemos, incentivamos ni facilitamos el cultivo ilícito, el
          uso indebido o cualquier actividad contraria a la ley.
          <br />
          <br />
          <strong>SaibaiSuru</strong> opera dentro del marco legal colombiano.
          No se comercializan plantas ni semillas con efectos psicoactivos o
          alucinógenos. El autocultivo con fines personales está regulado en
          Colombia, y el comprador es <strong>únicamente responsable</strong>{" "}
          del uso que le dé a los productos adquiridos, conforme a la
          normatividad vigente.
          <br />
          <br />
          Al ingresar, confirmas que eres mayor de edad y que entiendes y
          aceptas estas condiciones.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleAccept}
            // className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            className="fade-in text-white text-sm sm:text-base px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded hover:cursor-pointer hover:scale-105 active:scale-100 duration-300"
          >
            Tengo 18 años o más - Entrar
          </button>
          <button
            onClick={handleReject}
            className="fade-in text-white text-sm sm:text-base px-6 py-2 bg-gray-600 rounded hover:cursor-pointer hover:scale-105 active:scale-100 duration-300"
          >
            Soy menor de 18 años - Salir
          </button>
        </div>
      </div>
    </div>
  );
}
