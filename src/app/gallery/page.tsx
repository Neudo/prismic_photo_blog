import { Metadata } from "next";
import { createClient } from "@/prismicio";
import SwiperGallery from "@/components/SwiperGallery";
import Bounded from "@/components/Bounded";
export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("gallery");
    const categories = await client.getAllByType("categorie");

    return <>
        <Bounded>
            <SwiperGallery data={categories} />
        </Bounded>
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

