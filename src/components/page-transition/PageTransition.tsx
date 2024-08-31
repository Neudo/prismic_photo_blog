'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { slide, perspective, opacity } from "./anim";

function PageTransition({ children }: { children: React.ReactNode }) {
    const anim = (variants: any) => {
        return {
            initial: 'initial',
            animate: 'enter',
            exit: 'exit',
            variants
        }
    }


    return (
        <div className="inner">
            <motion.div {...anim(slide)} className="slide fixed top-0 left-0 w-screen h-screen bg-red-400 z-20"/>
            <motion.div {...anim(perspective)} className="page">
                <motion.div {...anim(opacity)} >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default PageTransition;
