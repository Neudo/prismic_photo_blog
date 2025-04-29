"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type JSX } from "react";
import Cards from "./Cards";

/**
 * Props for `Steps`.
 */
export type StepsProps = SliceComponentProps<Content.StepsSlice>;

/**
 * Component for "Steps" Slices.
 */
const Steps = ({ slice }: StepsProps): JSX.Element => {
  //Anim Zoom
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 3]);

  return (
    <>
      <div ref={container} className="relative h-[300vh]">
        <div className="bg-primary-green sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ scale: scale5 }}
            className="el absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className="imageContainer relative -left-[28vw] -top-[20vh] h-[45vh] w-[17vw]">
              <PrismicNextImage
                className="absolute inset-0 h-full w-full object-cover"
                field={slice.primary.image_1}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scale6 }}
            className="el absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className="imageContainer relative left-[5vw] top-[30vh] h-[25vh] w-[20vw]">
              <PrismicNextImage
                className="absolute inset-0 h-full w-full object-cover"
                field={slice.primary.image_2}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scale3 }}
            className="el absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className="imageContainer relative -left-[25vw] top-[30vh] h-[25vh] w-[35vw] ">
              <PrismicNextImage
                className="absolute inset-0 h-full w-full object-cover"
                field={slice.primary.image_3}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scale5 }}
            className="el absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className="imageContainer relative left-[30vw] top-0 h-[30vh] w-[20vw] ">
              <PrismicNextImage
                className="absolute inset-0 h-full w-full object-cover"
                field={slice.primary.image_4}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scale4 }}
            className="el absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className="imageContainer relative top-0 h-[25vh] w-[25vw]  ">
              <PrismicNextImage
                className="absolute inset-0 h-full w-full object-cover"
                field={slice.primary.image_5}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scale4 }}
            className="el absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className="imageContainer relative left-[30vw] top-[30vh] h-[25vh] w-[25vw] ">
              <PrismicNextImage
                className="absolute inset-0 h-full w-full object-cover"
                field={slice.primary.image_6}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scale8 }}
            className="el absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className="imageContainer relative -top-[32vh] left-[3vw] h-[28vh] w-[41vw] ">
              <PrismicNextImage
                className="absolute inset-0 h-full w-full object-cover"
                field={slice.primary.image_7}
              />
            </div>
          </motion.div>
        </div>
      </div>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-primary-green text-white "
      >
        <Cards data={slice} />
      </Bounded>
    </>
  );
};

export default Steps;
