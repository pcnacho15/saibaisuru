'use client'

import { Product } from "@/interfaces/Product";
import { ProductGridItem } from "./ProductGridItem";
// import { IoFilterOutline } from "react-icons/io5";
// import { useUiStore } from "@/store/uiStore";
import { useFilterStore } from "@/store/productStore";


interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {

  // const openFilterSideMenu = useUiStore((state) => state.openFilterSideMenu);
  const semillas = useFilterStore((state) => state.semillas);
  const cultivos = useFilterStore((state) => state.cultivos);

  if(semillas.length) {
    products = products.filter((product) => semillas.includes(product.subCategoria.nombre));
  }

  if(cultivos.length) {
    products = products.filter((product) => cultivos.includes(product.subCategoria.nombre));
  }


  return (
    <>
      <div className="flex flex-col gap-8">
        {/* <button
          onClick={() => openFilterSideMenu()}
          className="flex md:hidden items-center gap-2 pl-4 py-2 shadow-md mt-5 font-semibold bg-white hover:bg-gray-100 w-28 rounded"
          type="button"
        >
          <IoFilterOutline size={25} />
          Filtrar
        </button> */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {products.map((p) => (
            <ProductGridItem
              key={p.slug}
              product={p}
            />
          ))}
        </div>
      </div>
    </>
  );
}
