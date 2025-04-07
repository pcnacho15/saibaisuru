import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { EstadoOrder } from "@prisma/client";

export const updateStatusOrder = async (
  orderId: string,
  status: EstadoOrder
) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        estado_order: status,
      },
    });

    // Todo: RevalidatePaths
    revalidatePath("/admin/orders");
    revalidatePath(`/order/${orderId}`);
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
