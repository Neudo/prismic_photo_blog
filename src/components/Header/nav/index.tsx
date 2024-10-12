import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { NavBarProps } from "@/components/Header/NavOuter";
import { motion } from "framer-motion";
import { menuSlide, slide } from "@/components/Header/anim";
import Curve from "@/components/Header/Curve/index";
import { PrismicNextLink } from "@prismicio/next";
import { useNav } from "@/context/NavContext";

const Index: React.FC<NavBarProps> = ({ settings }) => {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const { isActive, setIsActive } = useNav();
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="bg-primary-green fixed right-0 top-0 z-10 h-screen text-white"
    >
      <div className="flex h-full flex-col justify-between p-[100px]">
        <div className="mt-[80px] flex flex-col gap-3 text-2xl md:text-5xl">
          {settings.data.navigation.map((item: any, index: number) => (
            <motion.div
              key={item.label}
              onMouseEnter={() => setSelectedIndicator(item.link.url)}
              custom={index}
              variants={slide}
              initial="initial"
              animate="enter"
              exit="exit"
              className="relative mb-[17px] flex items-center"
            >
              <PrismicNextLink
                field={item.link}
                onClick={() => {
                  setIsActive(!isActive);
                }}
              >
                {item.label}
              </PrismicNextLink>
            </motion.div>
          ))}
        </div>
      </div>
      <Curve />
    </motion.div>
  );
};

export default Index;
