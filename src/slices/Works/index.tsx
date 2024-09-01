import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {PrismicNextImage, PrismicNextLink} from "@prismicio/next";
import TransitionLink from "@/components/TransitionLink";


/**
 * Props for `Works`.
 */
export type WorksProps = SliceComponentProps<Content.WorksSlice>;

/**
 * Component for "Works" Slices.
 */
const Works = ({ slice }: WorksProps): JSX.Element => {
    console.log(slice.primary.cta);
    const ctaInfos = {
        label: slice.primary.cta_label,
        link: slice.primary.cta
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
            <TransitionLink data={ctaInfos} simple_link={false} />
        </section>
    );
};

export default Works;
