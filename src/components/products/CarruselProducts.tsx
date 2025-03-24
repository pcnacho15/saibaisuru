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
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full m-auto max-w-sm md:max-w-6xl"
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
