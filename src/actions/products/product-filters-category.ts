import prisma from "@/lib/prisma";


export const getFiltersProduct = async (categoria: string ) => {


  if(categoria === "semillas") {
    
  }

  const tipoSemillas = await prisma.productos.findMany({
    select: {
      tipo_semilla: true,
    },
    distinct: ["tipo_semilla"],
  });

  return {
    tipoSemillas,
  };


  
  
  
};
