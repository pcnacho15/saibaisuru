"use client";

import Link from "next/link";
import clsx from "clsx";

import { useUiStore } from "@/store/uiStore";
import {
  // IoBulbOutline,
  IoCloseOutline,
  IoHomeOutline,
  // IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  // IoSearchOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { logout } from "@/actions";
import { RiSeedlingLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { PiMailbox, PiShovel } from "react-icons/pi";
import { BiLogIn } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";


export const Sidebar = () => {

  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);

  const closeMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const pathName = usePathname();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.rol === "admin";

  const onLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeMenu()}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[350px] md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-auto",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />
        {/* Input de busquedad */}
        {/* <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2"
          />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div> */}

        {/* Menú */}

        {/* Opciones de Menu */}
        <div className="flex flex-col md:hidden">
          <Link
            onClick={() => closeMenu()}
            className={`flex items-center gap-3 text-xl mt-10 p-2 rounded transition-all ${
              pathName === "/" && "bg-gray-100 font-semibold"
            }`}
            href="/"
          >
            <IoHomeOutline size={30} />
            <span>Inicio</span>
          </Link>
          <Link
            onClick={() => closeMenu()}
            className={`flex items-center gap-3 text-xl mt-10 p-2 rounded transition-all ${
              pathName === "/categories/semillas" && "bg-gray-100 font-semibold"
            }`}
            href="/categories/semillas"
          >
            <RiSeedlingLine size={30} />
            <span>Semillas</span>
          </Link>
          <Link
            onClick={() => closeMenu()}
            className={`flex items-center gap-3 text-xl mt-10 p-2 rounded transition-all ${
              pathName === "/categories/cultivo" && "bg-gray-100 font-semibold"
            }`}
            href="/categories/cultivo"
          >
            <PiShovel size={30} />
            Cultivo
          </Link>
          {/* Separador */}
          <div className="w-full h-px bg-gray-200 my-10"></div>
        </div>

        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={() => closeMenu()}
              className="flex items-center p-2 mt-0 md:mt-10 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Mis compras</span>
            </Link>

            <div className="w-full h-px bg-gray-200 my-10"></div>
          </>
        )}

        {isAdmin && (
          <>
            <Link
              href="/admin/products"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <RiSeedlingLine size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href="/admin/categories"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <MdOutlineCategory size={30} />
              <span className="ml-3 text-xl">Categorias</span>
            </Link>

            <Link
              href="/admin/subcategories"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <TbCategoryPlus size={30} />
              <span className="ml-3 text-xl">Sub Categorias</span>
            </Link>

            <Link
              href="/admin/orders"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <PiMailbox size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link
              href="/admin/users"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>

            <div className="w-full h-px bg-gray-200 my-10"></div>
          </>
        )}

        {isAuthenticated ? (
          <button
            onClick={() => onLogout()}
            className="flex w-full items-center p-2 text-red-600 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-1 text-xl">Salir</span>
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="flex w-full items-center p-2 text-blue-600 hover:bg-gray-100 rounded transition-all"
          >
            <span className="ml-1 text-xl">Ingresar</span>
            <BiLogIn size={30} />
          </Link>
        )}
      </nav>
    </div>
  );
};
