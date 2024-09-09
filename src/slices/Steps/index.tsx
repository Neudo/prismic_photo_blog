'use client'
import { Content } from "@prismicio/client";
import { SliceComponentProps} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import {PrismicNextImage} from "@prismicio/next";
import {useScroll, useTransform, motion} from "framer-motion";
import {useRef} from "react";
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
    const container = useRef(null)
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1,4])
    const scale5 = useTransform(scrollYProgress, [0, 1], [1,5])
    const scale6 = useTransform(scrollYProgress, [0, 1], [1,6])
    const scale8 = useTransform(scrollYProgress, [0, 1], [1,8])
    const scale3 = useTransform(scrollYProgress, [0, 1], [1,3])

    return (
        <>
            <div ref={container} className="h-[300vh] relative">

                <div className="sticky top-0 h-screen bg-primary-green overflow-hidden">

                    <motion.div style={{scale: scale5}}
                                className="el w-full h-full absolute top-0 flex items-center justify-center">
                        <div className="imageContainer w-[17vw] h-[45vh] relative -top-[20vh] -left-[28vw]">
                            <PrismicNextImage className="object-cover absolute w-full h-full inset-0"
                                              field={slice.primary.image_1}/>
                        </div>
                    </motion.div>

                    <motion.div style={{scale: scale6}}
                                className="el w-full h-full absolute top-0 flex items-center justify-center">
                        <div className="imageContainer w-[20vw] h-[25vh] relative top-[30vh] left-[5vw]">
                            <PrismicNextImage className="object-cover absolute w-full h-full inset-0"
                                              field={slice.primary.image_2}/>
                        </div>
                    </motion.div>

                    <motion.div style={{scale: scale3}}
                                className="el w-full h-full absolute top-0 flex items-center justify-center">
                        <div className="imageContainer w-[35vw] h-[25vh] relative top-[30vh] -left-[25vw] ">
                            <PrismicNextImage className="object-cover absolute w-full h-full inset-0"
                                              field={slice.primary.image_3}/>
                        </div>
                    </motion.div>

                    <motion.div style={{scale: scale5}}
                                className="el w-full h-full absolute top-0 flex items-center justify-center">
                        <div className="imageContainer w-[20vw] h-[30vh] relative top-0 left-[30vw] ">
                            <PrismicNextImage className="object-cover absolute w-full h-full inset-0"
                                              field={slice.primary.image_4}/>
                        </div>
                    </motion.div>

                    <motion.div style={{scale: scale4}}
                                className="el w-full h-full absolute top-0 flex items-center justify-center">
                        <div className="imageContainer w-[25vw] h-[25vh] relative top-0  ">
                            <PrismicNextImage className="object-cover absolute w-full h-full inset-0"
                                              field={slice.primary.image_5}/>
                        </div>
                    </motion.div>

                    <motion.div style={{scale: scale4}}
                                className="el w-full h-full absolute top-0 flex items-center justify-center">
                        <div className="imageContainer w-[25vw] h-[25vh] relative top-[30vh] left-[30vw] ">
                            <PrismicNextImage className="object-cover absolute w-full h-full inset-0"
                                              field={slice.primary.image_6}/>
                        </div>
                    </motion.div>

                    <motion.div style={{scale: scale8}}
                                className="el w-full h-full absolute top-0 flex items-center justify-center">
                        <div className="imageContainer w-[41vw] h-[28vh] relative -top-[32vh] left-[3vw] ">
                            <PrismicNextImage className="object-cover absolute w-full h-full inset-0"
                                              field={slice.primary.image_7}/>
                        </div>
                    </motion.div>

                </div>
            </div>
            <Bounded
                data-slice-type={slice.slice_type}
                data-slice-variation={slice.variation}
                className="text-white bg-primary-green overflow-x-hidden"
            >
                <Cards data={slice} />
            </Bounded>
        </>
    );
};

export default Steps;
