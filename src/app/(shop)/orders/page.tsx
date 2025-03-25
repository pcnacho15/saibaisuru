
import { getOrdersByUser } from "@/actions/orders/get-orders-by-user";
import { Title } from "@/components";
import { OrderItem } from "@/components/orders/OrderItem";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mis pedidos" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </>
  );
}
