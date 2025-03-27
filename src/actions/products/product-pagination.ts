"use server";

import prisma from "@/lib/prisma";

interface Pagination {
  page?: number;
  take?: number;
  categoryId?: string;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  categoryId,
}: Pagination) => {
  try {
    if (isNaN(page)) page = 1;
    if (page < 1) page = 1;

    // Obetener todos los productos
    const products = await prisma.productos.findMany({
      take: take,
      skip: (page - 1) * take,
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
        categoria: {
          select: {
            nombre: true,
          },
        },
      },
      where: {
        categorias_id: categoryId,
        cantidad: {
          gt: 0,
        },
      },
    });

    // Obtener total de todos los productos
    const totalCount = await prisma.productos.count({
      where: {
        categorias_id: categoryId,
        cantidad: {
          gt: 0,
        },
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map(({ producto_imagenes, ...product }) => ({
        ...product,
        //   especificaciones: JSON.parse(especificaciones || ""),
        images: producto_imagenes.map((img) => img.url),
      })),
    };
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo cargar los productos");
  }
};
