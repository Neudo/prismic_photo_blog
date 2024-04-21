import { Metadata } from "next";
import { notFound } from "next/navigation";
import {PrismicText, SliceZone} from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import {PrismicNextImage} from "@prismicio/next";
type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
    const client = createClient();
    const page = await client
        .getByUID("blog_post", params.uid)
        .catch(() => notFound());


    function formatDate(dateString: string | number | Date) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        // @ts-ignore
        const formattedDate = date.toLocaleDateString('fr-FR', options);
        return formattedDate;
    }

    const javascriptDate = new Date(page.first_publication_date)
    const dateToFormat = javascriptDate.toLocaleDateString()

    return (
        <Bounded as="article">
            <header className="pt-6 xl:pb-6 ">
                <div className="space-y-1 text-center">
                    <dl className="space-y-10">
                        <div>
                            <dt className="sr-only">Publié le</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time dateTime={page.first_publication_date}> {formatDate(dateToFormat)}</time>
                            </dd>
                        </div>
                    </dl>
                    <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                        <PrismicText field={page.data.title}/>
                    </h1>
                    <p className="mb-4 text-slate-300 text-lg">
                        <PrismicText field={page.data.description}/>
                    </p>
                </div>
            </header>

            <div className="divide-y-2 divide-gray-200 dark:divide-gray-700 gap-x-6" >
                <PrismicNextImage
                    field={page.data.main_image}
                    className="rounded-lg"
                    quality={100}
                />
            </div>

            <SliceZone slices={page.data.slices} components={components} />
        </Bounded>
    )
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const page = await client
        .getByUID("blog_post", params.uid)
        .catch(() => notFound());

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("blog_post");

    return pages.map((page) => {
        return { uid: page.uid };
    });
}
