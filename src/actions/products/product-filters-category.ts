import prisma from "@/lib/prisma";

interface Filters {
  categoria: string;
}

export const getFiltersProduct = async ({ categoria }: Filters) => {

  let tipos;

  if(categoria === "semillas") {
    tipos = await prisma.productos.findMany({
      select: {
        tipo_semilla: true,
      },
      distinct: ["tipo_semilla"],
    });

  }

  
  return {
    tipos
  }

  
};
