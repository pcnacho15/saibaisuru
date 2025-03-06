import { initialData } from "./seed";

import prisma from "../lib/prisma";

async function main() {
  //* 1. Borrar registros previos
  await prisma.usuarios.deleteMany();

  const { users } = initialData;

  await prisma.usuarios.createMany({
    data: users,
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
