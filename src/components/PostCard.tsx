import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { RichText } from "./RichText";
import { Content } from "@prismicio/client";
import { dateConverter } from "@/utils/dateConverter";

export const PostCard = ({
  post,
}: {
  post: Content.BlogPostDocument;
}): JSX.Element => {
  const { data } = post;

  return (
    <div className="relative rounded-xl bg-slate-200 duration-300 hover:[box-shadow:2px_3px_20px_0_#e3e3e3] ">
      <PrismicNextImage
        field={data.featured_image}
        sizes="100vw"
        className="h-[240px] w-full rounded-xl rounded-b-none object-cover"
      />

      <div className="flex flex-col gap-3 p-6">
        <div className="flex w-full flex-col gap-1">
          <time
            dateTime={dateConverter(
              data?.publication_date
                ? data.publication_date.toString()
                : new Date().toString(),
            )}
            className="ease w-full border-b-2 pb-1 text-sm text-slate-700 opacity-75 transition-all"
          >
            {dateConverter(
              data?.publication_date
                ? data.publication_date.toString()
                : new Date().toString(),
            )}
          </time>
          <div className="transition-all duration-300 ease-in-out hover:opacity-75">
            <PrismicLink document={post} className="absolute-link">
              <h2 className="m-0 text-xl font-bold">
                <PrismicText field={data.title} />
              </h2>
            </PrismicLink>
          </div>
        </div>
        <RichText field={data.description} />
      </div>
    </div>
  );
};
