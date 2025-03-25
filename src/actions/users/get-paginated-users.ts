"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils";

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    return {
      ok: false,
      message: "Debe de ser un usuario administrador",
    };
  }

  const users = await prisma.usuarios.findMany({
    orderBy: {
      fecha_crea: "desc",
    },
  });

  return {
    ok: true,
    users: users,
  };
};
