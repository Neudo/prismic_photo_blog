// ./src/components/PostCard.tsx

import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { RichText } from "./RichText";
import { Content } from "@prismicio/client";

export const PostCard = ({
                             post,
                         }: {
    post: Content.BlogPostDocument;
}): JSX.Element => {
    const { data } = post;

    return (
        <div className="flex relative flex-col md:w-1/3 gap-2 py-3 justify-start">
            <PrismicNextImage
                field={data.featured_image}
                sizes="100vw"
                className="w-full h-[240px] rounded-xl object-cover"/>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <time dateTime={new Date(data?.publication_date || "").toLocaleDateString()} className="text-sm opacity-75 text-slate-700 border-b-2 w-min pb-1">
                        {new Date(data?.publication_date || "").toLocaleDateString()}
                    </time>
                    <div className="hover:opacity-75 duration-300 ease-in-out transition-all">
                        <PrismicLink document={post} className="after:content-[*] after:inset-0 after:absolute">
                        <h2 className="font-bold text-xl m-0">
                            <PrismicText field={data.title} />
                        </h2>
                        </PrismicLink>
                    </div>
                </div>
                <RichText field={data.description}  />
            </div>
        </div>
    );
};
