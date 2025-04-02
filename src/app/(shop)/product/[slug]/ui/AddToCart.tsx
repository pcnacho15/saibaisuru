"use client";

import { QuantitySelector } from "@/components";
import { CartProduct, Product } from "@/interfaces/Product";
import { useCartStore } from "@/store/cartStore";
import { sleep } from "@/utils";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  // const [colorActive, setColorActive] = useState(true);

  const addProductCart = async () => {
    setPosted(true);

    toast("🦄 ¡Producto agregado al carrito!", {
      position: "top-right",
      autoClose: 2000,
    });
    await sleep(0.5);

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.titulo,
      price: product.precio,
      quantity: quantity,
      tipoProducto: product.subCategoria.nombre,
      // color: product.color,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    await sleep(0.5);
    setPosted(false);
    setQuantity(1);
  };

  return (
    <>
      {/* {posted && !colorActive && (
        <span className="mt-2 text-red-500">Debes seleccionar un color*</span>
      )} */}

      {/* Selector de colores */}
      {/* <ColorSelector
        selectedColor={color}
        availableColor={product.colores}
        onColorChanged={setColor}
      /> */}

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanges={setQuantity}
      />

      {/* Botón */}

      <button
        onClick={() => addProductCart()}
        className="flex items-center bg-gradient-to-r from-purple-700 to-purple-600 rounded my-5 p-2 text-white font-semibold hover:cursor-pointer hover:scale-105 active:scale-100 transition-all duration-100 shadow-xl"
        disabled={posted}
      >
        Agregar al carrito
        <IoCartOutline
          size={25}
          className="ml-1"
        />
      </button>
    </>
  );
};
