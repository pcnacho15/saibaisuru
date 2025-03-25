// import Link from "next/link";

import Image from "next/image";
import { redirect } from "next/navigation";

import { currencyFormat } from "@/utils";
import prisma from "@/lib/prisma";
import { getOrderById } from "@/actions/orders/get-order-by-id";
import { OrderStatus } from "@/components/orders/OrderStatus";
// import { createPreferenceMP } from "@/modules/pagos/actions/mercado-pago/create-prefecence";
// import { MercadoPagoButton } from "@/modules/pagos/components/MercadoPagoButton";

type Params = Promise<{
  id: string;
}>;

type SearchParams = Promise<{
  ref_payco?: string;
}>;

// interface Props {
//   params: {
//     id: string;
//   };
// }

export default async function OrderPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await props.params;
  const currentParams = await props.searchParams;

  const refTransaction = currentParams.ref_payco;

  let { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  if (refTransaction && !order?.transaction_id) {
    await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        transaction_id: refTransaction,
      },
    });
  }

  // const preferenceId = (await createPreferenceMP(order!.id)) || "";

  const address = order!.OrderAdress;

  return (
    <div className="flex justify-center items-center mt-10 mb-36 px-0">
      <div className="flex flex-col w-[1000px]">
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className="h-96 pr-3 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300"
            >
              {/* Items */}
              {order!.OrderDetalle.map((item) => (
                <div
                  key={item.producto.slug}
                  className="flex mb-5 bg-white p-3 rounded-xl shadow-lg"
                >
                  <Image
                    src={`/products/${item.producto.producto_imagenes[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    alt={item.producto.titulo}
                    className="mr-5 rounded"
                  />

                  <div className="flex flex-col gap-2 justify-center">
                    <p>{item.producto.titulo}</p>
                    <p>
                      <span className="font-semibold">Cantidad:</span>{" "}
                      {item.cantidad}
                    </p>
                    <p>
                      <span className="font-semibold">Subtotal:</span>{" "}
                      {currencyFormat(item.precio * item.cantidad)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="flex flex-col bg-white rounded-xl shadow-xl">
            <div className="p-4">
              <h2 className={`text-2xl mb-2 font-semibold`}>Datos de envío</h2>
              <div className="mb-5">
                <div className="flex flex-col gap-1">
                  <p className="text-lg">
                    {address!.nombres} {address!.apellidos}
                  </p>
                  <p className="capitalize text-lg">
                    {address!.municipio} - {address!.departamento}
                  </p>
                  <p className="capitalize text-lg">{address!.direccion}</p>
                  <p className="capitalize text-lg">{address!.direccion2}</p>
                  <p className="text-lg">{address!.telefono}</p>
                  {/* <p className="text-lg">
                    Tipo de envío:{" "}
                    {!order?.tipoEnvio ? "Nacional" : "Recoger en la tienda"}
                  </p> */}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />

              <h2 className={`text-2xl mb-2 font-semibold`}>
                Resumen de tu compra
              </h2>

              <div className="grid grid-cols-2 mb-5">
                <span className="text-lg">No. Productos</span>
                <span className="text-right text-lg">
                  {order?.items_in_order === 1
                    ? "1 artículo"
                    : `${order?.items_in_order} artículos`}
                </span>

                <span className="text-lg mt-1">Subtotal</span>
                <span className="text-right text-lg mt-1">
                  {currencyFormat(order!.sub_total)}
                </span>
                <span className="mt-1 text-lg">Envío</span>

                <span className="text-right mt-1 text-lg">
                  {currencyFormat(order?.costo_envio || 0)}
                </span>

                {/* <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span> */}

                <div className="flex flex-col flex-wrap w-full">
                  <span className="mt-5 text-2xl">Total: </span>
                  <span className="mt-1 text-2xl">
                    {currencyFormat(order!.total)}
                  </span>
                </div>
              </div>
              {/* <span className="font-medium px-4 pt-4 mb-2 text-center">
                <span className="font-bold">Orden N°:</span> {id}
              </span> */}
              <OrderStatus
                isPaid={order!.estado_order}
                refEpayco={order?.ref_epayco || ""}
              />
              {/*  <div className="mt-5 mb-2 w-auto">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <>
                  <MercadoPagoButton
                    // amount={order!.total}
                    preferenceId={preferenceId}
                  />
                   <PaypalButton
                    amount={order!.total}
                    orderId={order!.id}
                  />
                </>
              )}
            </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
