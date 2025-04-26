import { getFeaturedProducts } from "@/actions/product/get-featured-products";
import { CarruselProducts } from "../products/CarruselProducts"

export const Featured = async() => {

    const { products } = await getFeaturedProducts();

  return (

    <section className="flex flex-col items-center py-10 px-6">
      <h2 className="text-2xl font-bold text-center mb-6">Productos destacados</h2>
      <CarruselProducts products={products} />
    </section>
  )
}
