"use client";
import React, { useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";
import { motion } from "framer-motion";
import { breakPointsChecker } from "@/utils/breakPointsChecker";
import { PrismicNextLink } from "@prismicio/next";

export type StepsProps = SliceComponentProps<Content.StepsSlice>;
interface CardProps {
  key: number;
  item: any;
}

interface CardsProps {
  data: StepsProps["slice"];
}

const Card = ({ key, item }: CardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  console.log("item cta ->", item.cta);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(breakPointsChecker(window.innerWidth).isMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardRef = useRef(null);

  return (
    <motion.li
      ref={cardRef}
      key={key}
      className="mb-[80px] rounded border-black bg-slate-200 px-4 py-6 text-black md:px-14 md:py-10"
      initial={{
        opacity: 0,
        translateY: "150px",
      }}
      whileInView={{
        opacity: 1,
        translateY: 0,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      viewport={{
        margin: "10%",
        once: true,
      }}
    >
      <RichText field={item.steps} />
      {item.cta.slug && (
        <PrismicNextLink
          field={item.cta}
          className="bg-primary-green mt-4 inline-flex min-h-11 items-center rounded-xl px-4 py-2 text-white"
        >
          {item.cta.slug}
        </PrismicNextLink>
      )}
    </motion.li>
  );
};

const Cards = ({ data }: CardsProps): JSX.Element => {
  return (
    <div className="flex h-full flex-col items-start justify-between gap-2 md:flex-row md:gap-4">
      <div className="bottom-[30%] pb-[17%] md:sticky md:top-[50%] md:w-[50%]">
        <RichText field={data.primary.titre} />
      </div>

      <div className="relative md:w-[50%] ">
        <ul>
          {data.items.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cards;
