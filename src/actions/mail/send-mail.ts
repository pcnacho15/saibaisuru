"use server";

import nodemailer from "nodemailer";

export const sendMail = async (email: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: `Saibai Suru <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🌱 Tu guía gratuita para empezar en el autocultivo",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>¡Gracias por unirte a nuestra comunidad de cultivadores! 🌿</h2>
          <p>Aquí tienes el acceso directo para descargar tu guía paso a paso:</p>
          <a href="https://saibaisuru.com/guias/guia-para-cultivadores-principiantes.pdf" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 16px;background-color:#581c87;color:white;text-decoration:none;border-radius:6px;">
            Descargar Guía 📥
          </a>
          <p style="margin-top:20px;font-size:14px;color:#777;">Si tienes dudas, contáctanos en saibaisuru.com</p>
        </div>
      `,
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error al enviar email:", error);
    return {
      ok: false,
      error: "Ha ocurrido un error al enviar la guía de autocultivo.",
    };
  }
};
