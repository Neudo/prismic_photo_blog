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

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({ slice }: HeroProps): Promise<JSX.Element> => {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <div className="relative h-[50vh] md:h-screen">
      <div className="absolute left-[50%] top-[60%] z-20 -translate-x-2/4 text-white">
        {isFilled.richText(slice.primary.title) && (
          <h1 className="text-3-xl mb-5 text-balance text-center font-medium md:text-7xl ">
            <PrismicText field={slice.primary.title} />
          </h1>
        )}
        {isFilled.richText(slice.primary.subTitle) && (
          <p className="text-2-xl mb-5 text-center font-light md:text-3xl">
            <PrismicText field={slice.primary.subTitle} />
          </p>
        )}
      </div>
      <nav
        className="absolute left-1/2 top-[80%] z-20 hidden -translate-x-1/2 justify-center md:flex"
        aria-label="Main"
      >
        <ul className="flex gap-6 rounded-lg  bg-indigo-50/50 p-4 text-black transition ease-in hover:bg-indigo-50">
          {settings.data.navigation.map((item) => (
            <li key={item.label}>
              <PrismicLink
                className="inline-flex min-h-11 items-center hover:underline "
                field={item.link}
              >
                {item.label}
              </PrismicLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute inset-0 z-10 rounded-3xl bg-[#000000] filter">
        <img
          src={slice.primary.hero_image.url || ""}
          alt="hero"
          className="h-full rounded-3xl border-[15px] border-white object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
