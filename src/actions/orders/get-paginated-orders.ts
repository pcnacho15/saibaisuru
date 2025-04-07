"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils";

interface Pagination {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 12,
}: Pagination) => {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  if (isNaN(page)) page = 1;
  if (page < 1) page = 1;

  const orders = await prisma.order.findMany({
    take: take,
    skip: (page - 1) * take,
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

  // Obtener total de todos los productos
  const totalCount = await prisma.order.count();
  const totalPages = Math.ceil(totalCount / take);

  return {
    ok: true,
    currentPage: page,
    totalPages: totalPages,
    orders: orders,
  };
};
