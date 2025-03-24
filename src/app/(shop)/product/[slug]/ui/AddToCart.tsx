"use client";


import { QuantitySelector } from "@/components";
import { CartProduct, Product } from "@/interfaces/Product";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const [colorActive, setColorActive] = useState(true);


  const addProductCart = () => {
    setPosted(true);


    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.titulo,
      price: product.precio,
      quantity: quantity,
      // color: product.color,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
  };

  return (
    <>
      {posted && !colorActive && (
        <span className="mt-2 text-red-500">Debes seleccionar un color*</span>
      )}

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
        className="flex items-center bg-gradient-to-r from-purple-700 to-purple-600 rounded my-5 p-2 text-white font-semibold hover:cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl"
      >
        <IoCartOutline className="mr-2" />
        Agregar al carrito
      </button>
    </>
  );
};
