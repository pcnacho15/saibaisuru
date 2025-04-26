"use client";

import Autoplay from "embla-carousel-autoplay";

import { ProductGridItem } from "./ProductGridItem";
import { Product } from "@/interfaces/Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/utils/carousel";

interface Props {
  products: Product[];
}

export const CarruselProducts = ({ products }: Props) => {
  return (
    <>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="md:pl-16 w-full m-auto max-w-sm md:max-w-7xl"
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <ProductGridItem product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </>
  );
};
