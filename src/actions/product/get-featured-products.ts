"use server";

// import { Product } from "@/interfaces/Product";
import prisma from "@/lib/prisma";
// import { sleep } from '@/utils';

export const getFeaturedProducts = async () => {
  try {
    // await sleep(3);

    const products = await prisma.productos.findMany({
      include: {
        producto_imagenes: {
          take: 2,
          select: {
            url: true,
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
      },
      where: {
        categoria: {
          nombre: "semillas",
        },
      },
      take: 5,
    });

    return {
      products: products.map(({ producto_imagenes, ...product }) => ({
        ...product,
        // especificaciones: JSON.parse(especificaciones || ""),
        images: producto_imagenes.map((img) => img.url),
      })),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos destacados");
  }
};
