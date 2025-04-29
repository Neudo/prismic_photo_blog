"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Category {
  id: string;
  uid: string;
  url: string;
  label: string;
  link: string;
  name: string;
  data: {
    url: string;
    name: string;
    highlight_image: any;
  };
}

function SwiperGallery({ data }: any) {
  const swiperRef = useRef<SwiperCore>(undefined);

  return (
    <div className="relative mx-auto max-w-[85vw] xl:max-w-6xl">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="h-[450px]"
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
          },
          768: {
            slidesPerView: 3.2,
          },
        }}
      >
        {data.map((item: Category, index: number) => (
          <SwiperSlide key={index}>
            <Link href={item.url}>
              <div
                className="flex h-[400px] w-full cursor-pointer flex-col items-center justify-center"
                style={{
                  backgroundImage: `url(${item.data.highlight_image.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="mt-2 text-center text-lg font-semibold text-slate-100">
                {item.data.name}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom navigation buttons */}
      <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2">
        <button className="custom-swiper-button-prev rounded-full bg-slate-200 p-2 md:p-4 ">
          <FaChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
        <button className="custom-swiper-button-next rounded-full bg-slate-200 p-2 md:p-4 ">
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default SwiperGallery;
