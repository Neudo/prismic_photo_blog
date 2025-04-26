/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicLink,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import "swiper/css";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import HeroMenu from "@/components/HeroMenu";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <div className="relative h-[50vh] md:h-screen">
      <div className="absolute left-[50%] top-[60%] z-20 -translate-x-2/4 text-white">
        {isFilled.richText(slice.primary.title) && (
          <h1 className="text-3-xl mb-5 text-balance text-center font-medium md:text-7xl">
            <PrismicText field={slice.primary.title} />
          </h1>
        )}
        {isFilled.richText(slice.primary.subTitle) && (
          <p className="text-2-xl mb-5 text-center font-light md:text-3xl">
            <PrismicText field={slice.primary.subTitle} />
          </p>
        )}
      </div>
      <HeroMenu />
      <div className="relative inset-0 z-10 h-screen rounded-3xl filter">
        <PrismicNextImage
          className="h-full rounded-3xl border-[15px] border-white object-cover"
          field={slice.primary.hero_image}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default Hero;
