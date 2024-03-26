'use client'
import Logo from "@/components/Logo"
import React from "react"
import { Content } from "@prismicio/client"
import {PrismicLink} from "@prismicio/react";

type NavBarProps = {
    settings: Content.SettingsDocument;

}

function NavBar({settings}: NavBarProps) {
    return (
        <nav className="p-4 fixed bottom-2 flex z-10 justify-center bg-black rounded-lg left-1/2 translate-x-[-50%] " aria-label="Main" >
            <ul className="gap-6 flex">
                {settings.data.navigation.map((item) => (
                    <li key={item.label}>
                        <PrismicLink className="inline-flex min-h-11 items-center" field={item.link} >{item.label}</PrismicLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;
