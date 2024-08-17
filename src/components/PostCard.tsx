import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { RichText } from "./RichText";
import { Content } from "@prismicio/client";
import {dateConverter} from "@/utils/dateConverter";

export const PostCard = ({
                             post,
                         }: {
    post: Content.BlogPostDocument;
}): JSX.Element => {
    const { data } = post;

    return (
        <div className="bg-slate-200 rounded-xl hover:[box-shadow:2px_3px_20px_0_#e3e3e3]">
            <PrismicNextImage
                field={data.featured_image}
                sizes="100vw"
                className="w-full h-[240px] rounded-xl rounded-b-none object-cover"/>

            <div className="flex flex-col gap-3 p-6">
                <div className="flex flex-col w-full gap-1">
                    <time dateTime={dateConverter(data?.publication_date ? data.publication_date.toString() : "")} className="text-sm opacity-75 transition-all ease text-slate-700 border-b-2 w-full pb-1">
                        {dateConverter(data?.publication_date ? data.publication_date.toString() : "")}
                    </time>
                    <div className="hover:opacity-75 duration-300 ease-in-out transition-all">
                        <PrismicLink document={post} className="absolute-link">
                            <h2 className="font-bold text-xl m-0 color-green ">
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
