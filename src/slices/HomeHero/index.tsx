'use client'
import {Content, isFilled} from "@prismicio/client";
import {PrismicLink, SliceComponentProps} from "@prismicio/react";
import { PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import "swiper/css";
import React from "react";
import {createClient} from "@/prismicio";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({slice}: HeroProps): Promise<JSX.Element> => {
    const client = createClient();
    const settings = await client.getSingle("settings");
    return (

        <div className="max-w-[98vw] overflow-hidden  mt-[2vh] mx-auto">

            <Swiper
                className={"h-[96vh] relative max-h-[96vh]"}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                // autoplay={true}
                modules={[Autoplay]}>
                <div className="absolute z-10 top-[60%] left-[50%] text-white -translate-x-2/4">
                    {isFilled.richText(slice.primary.title) && (
                        <h1 className="text-balance text-center text-5-xl font-medium md:text-7xl mb-5 ">
                            <PrismicText field={slice.primary.title}/>
                        </h1>
                    )}
                    {isFilled.richText(slice.primary.subTitle) && (
                        <p className="text-center text-2-xl md:text-3xl font-light mb-5">
                            <PrismicText field={slice.primary.subTitle}/>
                        </p>
                    )}
                    <nav
                        className="flex justify-center z-10"
                        aria-label="Main">
                        <ul className="gap-6 flex p-4  bg-indigo-50/50 transition ease-in hover:bg-indigo-50 text-black rounded-lg">
                            {settings.data.navigation.map((item) => (
                                <li key={item.label}>
                                    <PrismicLink className="inline-flex min-h-11 items-center hover:underline "
                                                 field={item.link}>{item.label}</PrismicLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                {slice.items.map((item, index) => (
                    <SwiperSlide className="max-h-[96vh] relative got-filter" key={index}>
                        <PrismicNextImage className="rounded-3xl h-[96vh] object-cover" field={item.image_list}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
