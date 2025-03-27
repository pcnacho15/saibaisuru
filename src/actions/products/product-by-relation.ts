import prisma from "@/lib/prisma";
// import { ValidMarcas } from "../interfaces/Product";

export const getProductsRelationByMarca = async (id: string) => {
  try {
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
            nombre: true
          }
        }
      },
      where: {
        // marca: marca,
        NOT: {
          id: id,
        },
      },
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
    throw new Error("No se pudo cargar los productos");
  }
};
