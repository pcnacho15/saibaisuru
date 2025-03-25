"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils";
import { revalidateOrders } from "./revalidate-orders-epayco";

export const getOrderById = async (id: string) => {
  // const session = await auth();

  // if (!session?.user) {
  //   return {
  //     ok: false,
  //     message: "Debe de estar autenticado",
  //   };
  // }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAdress: true,
        OrderDetalle: {
          select: {
            precio: true,
            cantidad: true,
            // color: true,
            producto: {
              select: {
                id: true,
                categorias_id: true,
                titulo: true,
                slug: true,

                producto_imagenes: {
                  select: {
                    url: true,
                  },
                  orderBy: {
                    url: "asc",
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${id} no existe`;

    // if (session.user.role === "user") {
    //   if (session.user.id !== order.userId) {
    //     throw `${id} no es de ese usuario`;
    //   }
    // }

    if (order.estado_order === "pendiente" && order.transaction_id) {
      const { ok, order: orderValidate } = await revalidateOrders(
        order.transaction_id
      );
      if (ok && orderValidate) {
        order.estado_order = orderValidate.estado_order;
        order.fecha_pago = orderValidate.fecha_pago;
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Orden no existe",
    };
  }
};
