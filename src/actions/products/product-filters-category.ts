import prisma from "@/lib/prisma";


export const getFiltersProduct = async () => {


  const tipoSemillas = await prisma.productos.findMany({
    select: {
     subCategoria: {
      select: {
        nombre: true,
      }
     }
    },
   where: {
    categoria: {
      nombre: 'semillas',
    }
   },
   distinct: ['sub_categorias_id'],
  });

  const tipoCultivos = await prisma.productos.findMany({
    select: {
      subCategoria: {
        select: {
          nombre: true,
        },
      },
    },
    where: {
      categoria: {
        nombre: "cultivo",
      },
    },
    distinct: ["sub_categorias_id"],
  });

  const tipoKits = await prisma.productos.findMany({
    select: {
      subCategoria: {
        select: {
          nombre: true,
        },
      },
    },
    where: {
      categoria: {
        nombre: "kits",
      },
    },
    distinct: ["sub_categorias_id"],
  });

  const tipoSemillasMap = tipoSemillas.map((item) => (
    {
      nombre: item.subCategoria.nombre,
    }
  ));

  const tipoCultivosMap = tipoCultivos.map((item) => (
    {
      nombre: item.subCategoria.nombre,
    }
  ));

  const tipoKitsMap = tipoKits.map((item) => (
    {
      nombre: item.subCategoria.nombre,
    }
  ));

  return {
    tipoSemillas: tipoSemillasMap,
    tipoCultivos: tipoCultivosMap,
    tipoKits: tipoKitsMap,
  };


  
  
  
};
