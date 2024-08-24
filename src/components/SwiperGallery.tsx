'use client'
import React from 'react';
import {PrismicNextImage} from "@prismicio/next";
// Import SwiperGallery React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import SwiperGallery styles
import 'swiper/css';


interface Category {
    url: string | null;
    data: {
        name: string | null;
        highlight_image: any;
    }
}

interface SwiperGalleryProps {
    data: Category[];
}

function SwiperGallery({data}: SwiperGalleryProps) {
    console.log(data);
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            onSwiper={(swiper) => console.log(swiper)}
        >

            {data.map((category, index) => (
                <SwiperSlide key={index}>
                    <a href={category.url || '/gallery'}>
                        <h1>{category.data.name}</h1>
                    </a>
                    <PrismicNextImage field={category.data.highlight_image} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SwiperGallery;
