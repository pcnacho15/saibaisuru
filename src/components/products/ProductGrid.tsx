import { Product } from "@/interfaces/Product";
import { ProductGridItem } from "./ProductGridItem";


interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {



  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-8">
      {products.map((p) => (
        <ProductGridItem
          key={p.slug}
          product={p}
        />
      ))}
    </div>
  );
}
