import React from 'react';
import NavBar from "@/components/Header/NavOuter";
import {createClient} from "@/prismicio";

export default async function Header() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <>
            <NavBar settings={settings}/>
        </>
    );
};

