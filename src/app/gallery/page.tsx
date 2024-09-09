import { Metadata } from "next";
import { createClient } from "@/prismicio";
import SwiperGallery from "@/components/SwiperGallery";


export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("gallery");
    const categories = await client.getAllByType("categorie");

    console.log(page.type)

    return <>
        <div className="bg-dark">
            <h1 className="container mx-auto max-w-screen-xl pt-16 absolute top-0 left-1/2 text-slate-300 -translate-x-1/2">Galerie photo</h1>
            <SwiperGallery data={categories}/>
        </div>
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

