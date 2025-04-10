"use server";

import { Adress } from "@/interfaces/Address";
import prisma from "@/lib/prisma";
import { auth } from "@/utils";

interface ProductToOrder {
  productId: string;
  quantity: number;
  // color?: string;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Adress
) => {
  const session = await auth();
  const userId = session?.user.id;

  // if (!userId) {
  //   return {
  //     ok: false,
  //     message: "No hay sesión de usuario",
  //   };
  // }

  // Obtener información de los productos
  

  const products = await prisma.productos.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // Los totales de tax, subtotal, y total
  const { subTotal, /*tax,*/ total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.precio * productQuantity;

      totals.subTotal += subTotal;
      // totals.tax += subTotal * 0.15;
      totals.total += subTotal /* 1.15*/;

      return totals;
    },
    { subTotal: 0, /*tax: 0,*/ total: 0 }
  );


  // Crear la transacción de base de datos

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //  Acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.productos.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity // no hacer
            cantidad: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en las existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.cantidad < 0) {
          throw new Error(`${product.titulo} no tiene inventario suficiente`);
        }
      });

      //* Calcular costo de envío
      const costoEnvio = 14000;
      const totalConEnvio = total + costoEnvio;

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          usuario_id: userId,
          items_in_order: itemsInOrder,
          // tipoEnvio: address.tipoEnvio,
          costo_envio: costoEnvio,
          // tax: tax,
          sub_total: subTotal,
          total: totalConEnvio,

          OrderDetalle: {
            createMany: {
              data: productIds.map((p) => ({
                cantidad: p.quantity,
                // color: p.color ?? "",
                producto_id: p.productId,
                precio:
                  products.find((product) => product.id === p.productId)
                    ?.precio ?? 0,
              })),
            },
          },
        },
      });

      // Validar, si el price es cero, entonces, lanzar un error

      // 3. Crear la direccion de la orden
      // Address
      const orderAddress = await tx.order_adress.create({
        data: {
          ...address,
          order_id: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Ha ocurrido un error realizado la orden: ${ error }`,
    };
  }

  // return {
  //   ok: true,
  //   order: order,
  //   prismaTx: prismaTx,
  // };
};
