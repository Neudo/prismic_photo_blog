"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { motion } from "framer-motion";

/**
 * Props for `TextImage`.
 */
export type TextImageProps = SliceComponentProps<Content.TextImageSlice>;

/**
 * Component for "TextImage" Slices.
 */
const TextImage = ({ slice }: TextImageProps): JSX.Element => {
  console.log(slice.primary.with_bg);
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={slice.primary.with_bg ? "bg-primary-green text-white" : ""}
    >
      <div
        className={`flex flex-wrap items-center justify-between ${slice.primary.position ? "" : "flex-row-reverse"}`}
      >
        <div className="mb-6 md:w-[50%]">
          <PrismicRichText field={slice.primary.title} />
          <PrismicRichText field={slice.primary.text} />
        </div>
        <motion.div
          className="md:w-[45%]"
          initial={{ opacity: 0, translateY: "50px" }}
          whileInView={{
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.4 },
          }}
          viewport={{ margin: "10%" }}
        >
          <PrismicNextImage
            className="rounded-2xl"
            field={slice.primary.image}
          />
        </motion.div>
      </div>
    </Bounded>
  );
};

export default TextImage;
