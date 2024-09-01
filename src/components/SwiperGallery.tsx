'use client'
import React from 'react';
import {PrismicNextImage} from "@prismicio/next";
// Import SwiperGallery React components
import { Swiper, SwiperSlide } from 'swiper/react';
import TransitionLink from "@/components/TransitionLink";

// Import SwiperGallery styles
import 'swiper/css';

interface Category {
    id: string;
    uid: string;
    url: string;
    label: string;
    link: string;
    name: string;
    data: {
        name: string;
        highlight_image: any;
    }
}



function SwiperGallery({data}:any ) {
    return (
        <Swiper
            spaceBetween={15}
            slidesPerView={3}
            loop={true}
            className="w-full"
        >

            {data.map((category:Category, index:number) => (
                <SwiperSlide key={index}>
                    <TransitionLink data={category} simple_link={true}  />
                    <PrismicNextImage field={category.data.highlight_image} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SwiperGallery;
