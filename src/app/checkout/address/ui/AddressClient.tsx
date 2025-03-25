"use client";

import { TbTruckDelivery } from "react-icons/tb";
import { AdressForm } from "./AdressForm";
import { departamentos, municipios } from "@prisma/client";
import { redirect } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Title } from "@/components";

interface Props {
  departamentos: departamentos[];
  municipios: municipios[];
}

export const AddressClient = ({ departamentos, municipios }: Props) => {

    const productsInCartExist = useCartStore().cart;

    // console.log(productsInCartExist.length);

    if (productsInCartExist.length <= 0) {
        redirect('/cart');
    }

  return (
    <>
      <Title
        title="Información de envío"
        subtitle="Dirección de entrega y datos de contacto"
        icon={<TbTruckDelivery size={40} />}
      />

      <AdressForm
        departamentos={departamentos}
        municipios={municipios}
      />
    </>
  );
};
