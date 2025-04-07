"use client";

import { CartProduct, Product } from "@/interfaces/Product";
import { useCartStore } from "@/store/cartStore";
import { currencyFormat, sleep } from "@/utils";
import Link from "next/link";
import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { ProductImage } from "../product/product-image/ProductImage";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  // const [displayImage, setDisplayImage] = useState(product.images[0]);
  const [posted, setPosted] = useState(false);
  const [check, setCheck] = useState(false);

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addProductCart = async () => {
    setPosted(true);

    await sleep(0.5);

    // if (product.colores.length >= 1) {
    //   if (!color) {
    //     // setColorActive(false);
    //     return;
    //   }
    // }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.titulo,
      price: product.precio,
      quantity: 1,
      tipoProducto: product.subCategoria.nombre,
      // color: product.color,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setCheck(true);
    toast("🦄 ¡Producto agregado al carrito!", {
      position: "top-right",
      autoClose: 1000,
    });
    await sleep(0.5);
    setPosted(false);
    setCheck(false);
    // setQuantity(1);
    // console.log({ color, quantity });
  };

  if (product.contenido === 0) product.contenido = null;
  if (product.descuento === 0) product.descuento = null;

  return (
    <div className="flex flex-col overflow-hidden fade-in w-full h-full">
      <Link
        href={`/product/${product.slug}`}
        className="hover:rotate-1 transition-all duration-300"
      >
        <ProductImage
          src={product.images[0]}
          alt={product.titulo}
          className="w-full object-cover rounded-3xl"
          width={400}
          height={400}
          //   onMouseEnter={() => setDisplayImage(product.images[1])}
          //   onMouseLeave={() => setDisplayImage(product.images[0])}
        />
        {/* <div className="relative bg-lime-600 h-9 text-white font-semibold text-center">
          <span>40% OFF</span>
        </div> */}
      </Link>

      <div className="p-4 flex flex-col gap-5 grow">
        <div className="flex flex-col grow gap-1">
          <div className="flex justify-between items-center gap-3">
            <span className={` uppercase font-base text-gray-400 text-sm`}>
              {product.subCategoria.nombre}
            </span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-lg capitalize hover:text-purple-600 transition-colors duration-300 text-ellipsis">
                {product.titulo}{" "}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex flex-col xl:flex-row items-start">
          <div className="flex flex-col">
            <div className="flex items-center justify-start">
              <span className={`${!product.descuento && "mb-5"}`}>
                {currencyFormat(product.precio)}
              </span>
              {product.descuento && (
                <span className="text-xs bg-red-600 rounded text-white px-1 ml-1">
                  -{product.descuento}%
                </span>
              )}
            </div>
            {product.descuento && (
              <span className="text-gray-400 line-through text-sm">
                {currencyFormat(
                  (product.precio * product.descuento) / 100 + product.precio
                )}
              </span>
            )}
          </div>
          {posted ? (
            <button
              type="button"
              className="fade-in flex items-center text-center text-white justify-center bg-gradient-to-r from-purple-500 to-purple-400 rounded mt-3 lg:mt-0 py-2 w-full xl:w-1/2 m-auto hover:cursor-not-allowed duration-300"
              disabled
            >
              <div className="flex items-center justify-center m-[2.5px]">
                {check ? (
                  <FaRegCircleCheck
                    size={20}
                    className="fade-in"
                  />
                ) : (
                  <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                )}
              </div>
            </button>
          ) : (
            <button
              onClick={() => addProductCart()}
              className="fade-in flex items-center text-center text-white justify-center bg-gradient-to-r from-purple-600 to-purple-500 rounded mt-3 lg:mt-0 py-2 w-full xl:w-1/2 m-auto hover:cursor-pointer hover:scale-105 duration-300"
              disabled={posted}
            >
              Agregar
              <RiShoppingBasket2Line
                size={25}
                className="ml-1"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
