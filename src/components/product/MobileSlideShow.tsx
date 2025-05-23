"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
// import Image from "next/image";
import { ProductImage } from "./product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const MobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100%",
          height: "100%",
        }}
        pagination
        autoplay={{
          delay: 2000,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper2"
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <ProductImage
              width={600}
              height={500}
              src={img}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
