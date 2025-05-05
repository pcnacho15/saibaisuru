"use client";

import { sendMail } from "@/actions";
import { useState } from "react";
import { toast } from "react-toastify";

export const Mail = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // 👉 Aquí puedes conectarlo a tu backend o un servicio como Brevo, Mailchimp, etc.
    const { ok } = await sendMail(email);
    if (ok) {
      setStatus("success");
      setEmail("");
      toast.success("¡Guía enviada a tu correo!", {
        position: "bottom-center",
        autoClose: 1000,
      });
    } else {
      setStatus("error");
      toast.error("Upss, hubo un error al enviar la guía. Intenta de nuevo.", {
        position: "bottom-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 px-10 mb-10 text-center md:text-start">
      <h2 className="text-3xl font-bold mb-4">
        ¿Quieres aprender a cultivar? 🌿
      </h2>
      <p className="mb-6 text-lg">
        Recibe nuestra guía paso a paso directo a tu correo. ¡Totalmente gratis!
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-start gap-4"
      >
        <input
          type="email"
          required
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md w-full max-w-sm text-black"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-white text-[#581c87] w-[25%] font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
        >
          {status === "loading" ? (
            <div className="flex items-center justify-center h-6 w-6 border-t-transparent border-solid animate-spin rounded-full border-[#581c87] border-4"></div>
          ) : (
            <>Enviar guía</>
          )}
        </button>
      </form>
    </div>
  );
};
