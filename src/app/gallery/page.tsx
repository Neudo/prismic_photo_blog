import { Metadata } from "next";
import { createClient } from "@/prismicio";
import SwiperGallery from "@/components/SwiperGallery";
import Bounded from "@/components/Bounded";


export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("gallery");
    const categories = await client.getAllByType("categorie");

    return <>
        <h1 className="container mx-auto max-w-screen-xl pt-16 absolute top-0 left-1/2  -translate-x-1/2">Galerie photo</h1>
        <SwiperGallery data={categories}/>
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

