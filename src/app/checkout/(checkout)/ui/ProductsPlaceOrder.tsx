"use client";

import { ProductImage } from "@/components/product/product-image/ProductImage";
import { useCartStore } from "@/store/cartStore";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const ProductsPlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore().cart;

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div
      className={clsx(
        `pr-3 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300`,
        {
          "h-[330px]": productsInCart.length > 1,
          "h-auto": productsInCart.length === 1,
        }
      )}
    >
      {productsInCart.map((p) => (
        <div
          key={`${p.slug}`}
          className="flex my-3 pl-6 py-5 bg-white shadow-md rounded-xl w-auto"
        >
          <ProductImage
            src={p.image}
            width={100}
            height={100}
            alt={p.title}
            className="mr-5 rounded"
          />

          <div className="flex flex-col justify-start items-start">
            <span className="text-base">
              <p className={`text-base capitalize font-medium`}>
                {p.title}{" "}
                <span className="font-bold text-purple-600">
                  ({p.quantity})
                </span>
              </p>
            </span>
            <p className="capitalize mt-1 mb-2 text-sm text-gray-500">
              ({p.tipoProducto})
            </p>
            <p className={`mb-2 mt-3 text-base font-medium`}>
              Subtotal:
              <span className="ml-2">
                {currencyFormat(p.price * p.quantity)}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
