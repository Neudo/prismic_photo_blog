import React from 'react';
import {createClient} from "@/prismicio";
import Logo from "@/components/Logo";
import {PrismicNextLink} from "@prismicio/next";
import Link from "next/link";

export default async function Footer(){
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <footer className="flex flex-col md:flex-row mt-10 items-center justify-between p-5 border-t border-slate-600 " >
                {/*<Logo />*/}

            <span className="sr-only" >Alainb photo.fr Home page</span>
            <nav>
                <ul className="gap-6 flex">
                    {settings.data.navigation.map((item) => (
                        <li key={item.label}>
                            <PrismicNextLink
                                field={item.link}
                                className="min-h-11 item-center"
                            >
                                {item.label} </PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    );
};

