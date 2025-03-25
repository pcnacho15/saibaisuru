"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils";

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      fecha_crea: "desc",
    },
    include: {
      OrderAdress: {
        select: {
          nombres: true,
          apellidos: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders: orders,
  };
};
