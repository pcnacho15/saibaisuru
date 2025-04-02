// import { getFiltersProduct } from "@/actions";
// import { FilterSidebar } from "../ui/filter-side-bar/FilterSideBar";

interface Props {
  tipo: string;
}

export const ProductFilterMenu = async ({ tipo }: Props) => {
  // const tipoSemillas = await getFiltersProduct(tipo);
  console.log(tipo)
  return (
    <div>FilterProductMenu</div>
  )
  // return (
  //   <FilterSidebar
  //     // colores={colores}
  //     semillas={tipoSemillas}
  //   />
  // );
};
