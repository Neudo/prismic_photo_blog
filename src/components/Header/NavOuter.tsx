'use client'
import React from "react";
import { Content } from "@prismicio/client";
import Nav from "@/components/Header/nav/index";
import { AnimatePresence } from "framer-motion";

export type NavBarProps = {
    settings: Content.SettingsDocument;
};

const NavBar: React.FC<NavBarProps> = ({ settings }) => {
    const [isActive, setIsActive] = React.useState(false);

    return (
        <>
            <div className="fixed right-0 m-5 z-20 w-[80px] h-[80px] rounded-full bg-primary-green cursor-pointer flex items-center justify-center"
                 onClick={() => { setIsActive(!isActive); }} >
                <div className={`burger ${isActive ? 'burgerActive' : ''}`}></div>
            </div>
            <AnimatePresence mode="wait">
                {isActive && <Nav settings={settings} />}
            </AnimatePresence>
        </>
    );
};

export default NavBar;
