"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.productos.findFirst({
      include: {
        producto_imagenes: {
          select: {
            url: true,
            id:true,
            productos_id: true
          },
          orderBy: {
            url: "asc",
          },
        },
        subCategoria: {
          select: {
            nombre: true,
          },
        },
        categoria: {
          select: {
            nombre: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    const producto = product;

    return {
      ...producto,
      images: product.producto_imagenes.map((image) => image.url),
      // especificaciones: JSON.parse(especificaciones || ""),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por slug");
  }
};
