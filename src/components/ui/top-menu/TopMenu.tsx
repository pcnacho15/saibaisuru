"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/uiStore";

// import { IoSearch } from "react-icons/io5";

// import { useUiStore } from "@/modules";
// import { useCartStore } from "@/modules/cart";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { BiLogIn } from "react-icons/bi";

export const TopMenu = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const pathActive = usePathname();
  const [loaded, setLoaded] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      if (window.scrollY >= 10) {
        setIsScrolled(true); // Si el scroll es mayor o igual a 10
      } else {
        setIsScrolled(false); // Si el scroll es menor a 10
      }
    };

    // Agregar el listener de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex fixed z-10 px-6 md:px-20 py-5 justify-between items-center w-full transition-all duration-300 ${
        isScrolled ? "bg-white/30 backdrop-blur-md" : "bg-none"
      }`}
    >
      {/* logo */}
      <div>
        <Link href="/">
          <span className="antialiased font-bold text-principal">Saibai</span>
          <span className="antialiased font-bold text-purple-900">Suru</span>
        </Link>
      </div>

      {/* Opciones de Menu */}
      <div className="hidden md:block text-sm">
        <Link
          className={`m-2 p-2 rounded-md font-semibold hover:text-purple-900 transition-all duration-200 ${
            pathActive === "/" && "text-principal"
          }`}
          href="/"
        >
          Inicio
        </Link>
        <Link
          className={`m-2 p-2 rounded-md hover:text-principal transition-all duration-200 font-semibold ${
            pathActive === "/categories/semillas" && "text-purple-900"
          }`}
          href="/categories/semillas"
        >
          Semillas
        </Link>
        <Link
          className={`m-2 p-2 rounded-md hover:text-purple-900 transition-all duration-200 font-semibold ${
            pathActive === "/categories/esquejes" && "text-principal"
          }`}
          href="/categories/esquejes"
        >
          Esquejes
        </Link>
        <Link
          className={`m-2 p-2 rounded-md hover:text-principal transition-all duration-200 font-semibold ${
            pathActive === "/categories/cultivo" && "text-purple-900"
          }`}
          href="/categories/cultivo"
        >
          Cultivo
        </Link>
      </div>

      {/* Buscar, Carrito, Menu */}
      <div className="flex items-center gap-4">
        {/* <Link
          href="/search"
          className="mx-2 hover:scale-105 transition-all duration-200"
        >
          <IoSearch className="w-5 h-6 pt-[3px]" />
        </Link> */}
        <Link
          href="/cart"
          className="hover:scale-110 transition-all duration-200"
        >
          {loaded && totalItems > 0 ? (
            <>
              <div className="relative">
                <span className="absolute -top-2 -right-1 bg-principal px-[5px] rounded-full text-xs text-center font-bold text-white">
                  {totalItems}
                </span>

                <HiOutlineShoppingCart className="w-7 h-7" />
              </div>
            </>
          ) : (
            <div className={`relative flex justify-center items-center py-1`}>
              <HiOutlineShoppingCart className="w-7 h-7" />
            </div>
          )}
        </Link>

        {!isAuthenticated ? (
          <>
            <button
              onClick={() => openSideMenu()}
              className="block md:hidden text-gray-200 text-sm hover:scale-105 hover:text-white transition-all duration-200 "
            >
              <div
                className={`bg-purple-800 rounded relative inline-flex flex-row gap-1 justify-center items-center py-2 px-2`}
              >
                <span>Menú</span>
                <RxHamburgerMenu size={20} />
              </div>
            </button>
            <Link
              href="/auth/login"
              className="hidden md:block"
            >
              <div className="flex items-center text-white bg-purple-900 rounded py-2 px-1">
                <span className="ml-1 text-sm">Ingresar</span>
                <BiLogIn size={20} />
              </div>
            </Link>
          </>
        ) : (
          <button
            onClick={() => openSideMenu()}
            className="rounded-md bg-purple-800 p-1 hover:scale-110 transition-all duration-200"
          >
            <Image
              src={`/icons/user.svg`}
              alt="user"
              width={25}
              height={25}
            />
          </button>
        )}
      </div>
    </nav>
  );
};
