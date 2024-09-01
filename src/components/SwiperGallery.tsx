'use client'
import React from 'react';
import {PrismicNextImage} from "@prismicio/next";
// Import SwiperGallery React components
import { Swiper, SwiperSlide } from 'swiper/react';
import TransitionLink from "@/components/TransitionLink";

// Import SwiperGallery styles
import 'swiper/css';


interface Category {
    label: string;
    link: any;
    name: string;
    url: string;
    data: {
        name: string;
        highlight_image: any;
    }
}


interface SwiperGalleryProps {
    data: Category[];
}

function SwiperGallery({data}: SwiperGalleryProps) {
    return (
        <Swiper
            spaceBetween={15}
            slidesPerView={3}
            loop={true}
            onSwiper={(swiper) => console.log(swiper)}
            className="w-full"
        >

            {data.map((category:Category, index) => (
                <SwiperSlide key={index}>
                    <TransitionLink data={category} simple_link={true}  />
                    <PrismicNextImage field={category.data.highlight_image} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SwiperGallery;
