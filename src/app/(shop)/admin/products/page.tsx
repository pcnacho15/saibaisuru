// https://tailwindcomponents.com/component/hoverable-table

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import Image from "next/image";
import { currencyFormat } from "@/utils";
// import { getPaginatedOrders } from "@/actions/orders/get-paginated-orders";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsAdminPage({ searchParams }: Props) {
  const currentParams = await searchParams;
  const currentPage = currentParams.page ? parseInt(currentParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: currentPage,
  });

  // if (!ok) {
  //   redirect("/");
  // }

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link
          href={"/admin/product/new"}
          className="text-center hover:bg-purple-900 bg-purple-600 rounded-md text-white hover:cursor-pointer hover:scale-105 duration-200 transition-all shadow-md p-2"
        >
          Agregar
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Categoria
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sub Categoria
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Descuento %
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={`/products/${product.images[0]}`}
                      width={80}
                      height={80}
                      alt={product.titulo}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.titulo}
                  </Link>
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.precio)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.categoria.nombre}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.subCategoria.nombre}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.cantidad}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.descuento ? (
                    <span>{product.descuento}%</span>
                  ) : (
                    <span>0%</span>
                  )}
                </td>
                {/* <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
