import React, { useState } from 'react';
import { usePathname } from "next/navigation";
import { NavBarProps } from "@/components/Header/NavOuter";
import { motion } from 'framer-motion';
import { menuSlide, slide } from "@/components/Header/anim";
import Curve from "@/components/Header/Curve/index";
import TransitionLink from "@/components/TransitionLink";

const Index: React.FC<NavBarProps> = ({ settings }) => {
    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);
    const isActive = selectedIndicator === pathname;

    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-screen z-10 fixed right-0 top-0 text-white bg-primary-green">
            <div className="h-full p-[100px] flex flex-col justify-between">
                <div className="flex flex-col text-2xl md:text-5xl gap-3 mt-[80px]">
                    {settings.data.navigation.map((item: any, index: number) => (
                        <motion.div
                            key={item.label}
                            onMouseEnter={() => setSelectedIndicator(item.link.url)}
                            custom={index}
                            variants={slide}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            className="mb-[17px] relative flex items-center">
                            <TransitionLink data={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
            <Curve />
        </motion.div>
    );
};

export default Index;
