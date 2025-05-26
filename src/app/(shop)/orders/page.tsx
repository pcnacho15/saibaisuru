import { getOrdersByUser } from "@/actions/orders/get-orders-by-user";
import { Title } from "@/components";
import { OrderItem } from "@/components/orders/OrderItem";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BsCartX } from "react-icons/bs";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mis pedidos" />

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[15.5rem]">
          <div className="flex flex-col items-center justify-center gap-5 mt-10">
            <BsCartX size={80} />
            <span className={`text-xl text-center font-semibold`}>
              Upps!! <br /> Parece que no has hecho ningún pedido aún
            </span>
            <Link
              href="/shop"
              className="underline mb-5 text-lime-600"
            >
              Ir de compras
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
