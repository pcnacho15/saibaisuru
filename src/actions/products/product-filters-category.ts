import prisma from "@/lib/prisma";


export const getFiltersProduct = async (categoria: string ) => {


  if(categoria === "semillas") {
    
  }

  const tipoSemillas = await prisma.productos.findMany({
    include: {
      subCategoria: {
        select: { 
          nombre: true
        },
        
      },
      
    },
    distinct: ['sub_categorias_id']
  });

  return {
    tipoSemillas,
  };


  
  
  
};
