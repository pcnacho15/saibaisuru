import { initialData } from "./seed";

import prisma from "../lib/prisma";
import { departamentos } from "./seed-departamentos";
import { municipios } from "./seed-municipios";

async function main() {
  //* 1. Borrar registros previos

  await prisma.municipios.deleteMany();
  await prisma.departamentos.deleteMany();

  await prisma.order_adress.deleteMany();
  await prisma.order_detalle.deleteMany();
  await prisma.order.deleteMany();

  await prisma.producto_imagenes.deleteMany();
  await prisma.productos.deleteMany();
  await prisma.categorias.deleteMany();
  await prisma.usuarios.deleteMany();

  const { usuarios } = initialData;

  await prisma.usuarios.createMany({
    data: usuarios,
  }); //? Crear usuarios

  await prisma.departamentos.createMany({
    data: departamentos,
  });

  await prisma.municipios.createMany({
    data: municipios,
  });

  const categoriasData = initialData.categorias!.map((categoria) => ({
    nombre: categoria,
  }));
  await prisma.categorias.createMany({
    data: categoriasData,
  }); //? Crear categorias

  const categoriesDB = await prisma.categorias.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.nombre] = category.id;
    return map;
  }, {} as Record<string, string>);


  initialData.productos.forEach(async (producto) => {
    const { categoria, imagenes, ...resto } = producto;
    
    const dpProducto = await prisma.productos.create({
      data: {
        ...resto,
        categorias_id: categoriesMap[categoria],
      },
    });

    //* Crear imagenes
    const imagenesData = imagenes.map((imagen) => ({
      url: imagen,
      productos_id: dpProducto.id,
    }));

    await prisma.producto_imagenes.createMany({
      data: imagenesData,
    });

  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
