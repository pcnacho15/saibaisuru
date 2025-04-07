// import { getFiltersProduct } from "@/actions";
// import { FilterSidebar } from "../ui/filter-side-bar/FilterSideBar";

import { getFiltersProduct } from "@/actions";
import { FilterSidebar } from "../ui/filter-side-bar/FilterSideBar";



export const ProductFilterMenu = async () => {
  const { tipoSemillas, tipoCultivos } = await getFiltersProduct();


  return (
    <FilterSidebar
      tipoSemillas={tipoSemillas}
      tipoCultivos={tipoCultivos}
    />
  );
};
