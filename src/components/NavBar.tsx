'use client'
import Logo from "@/components/Logo"
import React from "react"
import { Content } from "@prismicio/client"
import {PrismicLink} from "@prismicio/react";
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicNextImage } from "@prismicio/next";


type NavBarProps = {
    settings: Content.SettingsDocument;
}

function NavBar({settings}: NavBarProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <header className="px-4 invert mix-blend-difference fixed w-[95vw] top-10 left-1/2 -translate-x-1/2 flex z-50 text-white" aria-label="Main">
                <ul className="gap-6 flex w-full justify-between items-center text-black">
                    <li><a href="/">AB</a></li>
                    <li
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover:cursor-pointer">Menu</li>
                </ul>
            </header>

            <nav className={`fixed top-0 ${isOpen ? 'left-0' : 'left-full' } transition-left duration-300 ease-out z-40 w-full h-full bg-primary-green overflow-hidden`}>
                <div className="flex h-[95%] justify-between ml-[10vw]">
                    <div className="wrapper w-[60%] flex-col justify-between flex h-full ">
                        <ul className="flex flex-col text-white text-8xl uppercase mt-[110px]">
                            {settings.data.navigation.map((item) => (
                                <li className="mb-[17px]" key={item.label}>
                                    <PrismicLink className="inline-flex min-h-11 items-center" field={item.link}>{item.label}</PrismicLink>
                                </li>
                            ))}
                        </ul>
                        <ul className="text-slate-50 flex items-center text-4xl gap-x-5" >
                            <li><PrismicNextLink field={settings.data.facebook}><FaFacebook /></PrismicNextLink></li>
                            <li><PrismicNextLink field={settings.data.tiktok}><FaTiktok/></PrismicNextLink></li>
                            <li><PrismicNextLink field={settings.data.instagram}><FaInstagram/></PrismicNextLink></li>
                            <li><PrismicNextLink field={settings.data.youtube}><FaYoutube/></PrismicNextLink></li>
                            <li className="ml-[50px] text-2xl "><a href="mailto:contact@alainphoto.com">CONTACT@ALAINPHOTO.COM</a></li>
                        </ul>
                    </div>
                    <div className="wrapper w-[30%] mr-[2%] flex justify-end flex-col gap-4 translate-y-40">
                        <div className="img">
                            <PrismicNextImage field={settings.data.image_haut} />
                        </div>
                        <div className="img">
                            <PrismicNextImage field={settings.data.image_millieu} />
                        </div>
                        <div className="img">
                            <PrismicNextImage field={settings.data.image_bas} />
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
        ;
}

export default NavBar;


