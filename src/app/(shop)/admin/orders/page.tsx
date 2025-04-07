// https://tailwindcomponents.com/component/hoverable-table

import Link from "next/link";
import { Pagination, Title } from "@/components";
import { currencyFormat } from "@/utils";
import { getPaginatedOrders } from "@/actions/orders/get-paginated-orders";
import clsx from "clsx";
// import { getPaginatedOrders } from "@/actions/orders/get-paginated-orders";

type SearchParams = Promise<{
  page?: string;
}>;

export default async function ProductsAdminPage(props: {
  searchParams: SearchParams;
}) {
  const currentParams = await props.searchParams;
  const currentPage = currentParams.page ? parseInt(currentParams.page) : 1;

  const { orders, totalPages } = await getPaginatedOrders({
    page: currentPage,
  });

  // if (!ok) {
  //   redirect("/");
  // }


  return (
    <>
      <Title title="Seguimiento de órdenes" />
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                ID #
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Ref Epayco #
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Transaction ID #
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado Orden
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado Envío
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Costo Envío
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sub total
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Total
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/orders/${order.id}`}>{order.id}</Link>
                </td>
                <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                  {order.ref_epayco}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.transaction_id}
                </td>
                <td
                  className={clsx(
                    "text-sm font-light px-6 py-4 whitespace-nowrap",
                    {
                      "text-blue-600": order.estado_order === "pendiente",
                      "text-green-600": order.estado_order === "pagada",
                      "text-red-600": order.estado_order === "rechazada",
                    }
                  )}
                >
                  <button>{order.estado_order}</button>
                </td>
                <td
                  className={clsx(
                    "text-sm font-light px-6 py-4 whitespace-nowrap",
                    {
                      "text-orange-600": order.estado_envio === "enviando",
                      "text-blue-600": order.estado_envio === "enviado",
                      "text-green-600": order.estado_envio === "entregado",
                    }
                  )}
                >
                  <button>{order.estado_envio}</button>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {currencyFormat(order.costo_envio ?? 0)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {currencyFormat(order.sub_total)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {currencyFormat(order.total)}
                </td>
                <td className="text-sm text-blue-600 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages! > 1 && <Pagination totalPages={totalPages!} />}
    </>
  );
}
