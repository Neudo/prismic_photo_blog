'use client'
import React, {useEffect, useState} from 'react';
import { Content } from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";
import {RichText} from "@/components/RichText";
import {useRef} from "react";
import {useScroll, useTransform, motion} from "framer-motion";
import {breakPointsChecker} from "@/utils/breakPointsChecker";

export type StepsProps = SliceComponentProps<Content.StepsSlice>;
interface CardProps {
    index: number;
    item: any;
}

interface CardsProps {
    data: StepsProps['slice'];
}



const Card = ({index, item}: CardProps) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
         setIsMobile(breakPointsChecker(window.innerWidth).isMobile)
    }, [])



    const cardRef = useRef(null)
    const {scrollYProgress} = useScroll({
        target: cardRef,
        offset: ['200% end', 'end end'],
    })
    const translate = useTransform(scrollYProgress, [0, 1], ['0vw', '60vw']);

    return (
        <motion.li ref={cardRef} style={!isMobile ? {translateX: translate} : {translateY: translate}} key={index}
                   className="mb-[80px] rounded bg-slate-200 px-6 py-4 border-black text-black">
            <RichText field={item.steps}/>
        </motion.li>
    )
}

const Cards = ({data}: CardsProps): JSX.Element => {


    return (
        <div className="flex items-start justify-between flex-col gap-2 md:flex-row md:gap-4 h-full">
            <div className="md:w-[50%] md:sticky md:top-[50%] bottom-[30%] pb-[17%]">
                <RichText field={data.primary.titre}/>
            </div>

            <div className="md:w-[50%] relative ">
                {/*<div className="md:w-[50%] relative top-[70vh]">*/}

                <ul  className="">
                    {data.items.map((item, index) => (

                        <Card index={index} item={item} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Cards;
