import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import TestMotion from "@/components/TestMotion";



export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("gallery");

    return <>
        <SliceZone slices={page.data.slices} components={components}/>
        <TestMotion/>
    </>
}

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle("gallery");

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}

