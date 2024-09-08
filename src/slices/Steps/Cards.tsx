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
    key: number;
    item: any;
}

interface CardsProps {
    data: StepsProps['slice'];
}



const Card = ({key, item}: CardProps) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        console.log('use effect fired')
         setIsMobile(breakPointsChecker(window.innerWidth).isMobile)
    }, [window.innerWidth])



    const cardRef = useRef(null)
    const {scrollYProgress} = useScroll({
        target: cardRef,
        offset: ['200% end', 'end end'],
    })
    const translate = useTransform(scrollYProgress, [0, 1], ['0vw', '60vw']);

    return (
        <motion.li ref={cardRef} style={!isMobile ? {translateX: translate} : {translateY: translate}} key={key}
                   className="mb-[80px] rounded bg-slate-200 px-4 py-6 md:px-14 md:py-10 border-black text-black">
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
                        <Card key={index}  item={item} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Cards;
