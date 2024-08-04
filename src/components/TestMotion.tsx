"use client"
import React from 'react';
import {motion, useScroll} from 'framer-motion';

function TestMotion() {
    const { scrollYProgress } = useScroll();

    return (
        <div className="h-screen bg-slate-500">
            <motion.div
                className="w-20 h-20 bg-blue-500"
                animate={{x: 100}}/>
        </div>
    );
}


export default TestMotion;

