import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";



export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("gallery");
    const settings = await client.getSingle("settings");
    return <>
        {settings.data.categories.map((category, index) => (
            <div key={index}>
                <h1>{category.category_name}</h1>
                <PrismicNextImage field={category.image} />
            </div>
        ))}
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

