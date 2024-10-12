import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface CtaInfos {
  label?: string | undefined;
  link?: any;
  url: string;
  name?: string | undefined;
  data: {
    name: string;
  };
}

/**
 * Props for `Works`.
 */
export type WorksProps = SliceComponentProps<Content.WorksSlice>;

/**
 * Component for "Works" Slices.
 */
const Works = ({ slice }: WorksProps): JSX.Element => {
  const ctaInfos: CtaInfos = {
    label: slice.primary.cta_label || "",
    link: slice.primary.cta,
    url: "",
    data: {
      name: "En savoir plus",
    },
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-6"
    >
      <div className="flex gap-8">
        {slice.items.map((item, index) => (
          <div key={index} className="mb-[20px] h-[400px] w-[700px]">
            <PrismicNextImage className=" object-cover" field={item.images} />
          </div>
        ))}
      </div>
      {slice.primary.cta_label && slice.primary.cta && (
        <div className="flex">
          <div className="mx-auto inline-block rounded-xl bg-gray-800 px-4 py-2 text-center text-white">
            <PrismicNextLink
              field={slice.primary.cta}
              className="absolute-link"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Works;
