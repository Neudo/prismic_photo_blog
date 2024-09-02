import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";
import TransitionLink from "@/components/TransitionLink";

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

    const ctaInfos:CtaInfos = {
        label: slice.primary.cta_label || "",
        link: slice.primary.cta,
        url:  "",
        data: {
            name: "En savoir plus"
        }
    }

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="pt-6"
        >
            <div className="flex gap-8">
                {slice.items.map((item, index) => (
                    <div key={index} className="mb-[20px] h-auto w-[35vw]">
                        <PrismicNextImage className="" field={item.images} />
                    </div>
                ))}
            </div>

            <div className="text-center p-2 bg-gray-800 rounded-xl text-white inline-block mx-auto">
                <TransitionLink data={ctaInfos} simple_link={false} />
            </div>
        </section>
    );
};

export default Works;
