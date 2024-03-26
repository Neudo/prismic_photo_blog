import {Content, isFilled} from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import {container} from "slice-machine-ui/src/components/BaseHoverCard/BaseHoverCard.css";



/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="relative">
                {isFilled.richText(slice.primary.title) && (
                    <h1 className="text-balance text-center text-5-xl font-medium md:text-7xl mb-5 ">
                        <PrismicText field={slice.primary.title} />
                    </h1>
                )}
                {isFilled.richText(slice.primary.subTitle) && (
                    <div className="mx-auto max-w-md text-balance text-slate-300">
                        <PrismicRichText field={slice.primary.subTitle} />
                    </div>

                )}
                {isFilled.image(slice.primary.image) && (
                    <div className="glass-container mt-16 w-fit">
                        <div className="absolute inset-0 -z-10 bg-blue-300/10 blur-2xl filter"></div>
                        <PrismicNextImage className="rounded " field={slice.primary.image} />
                    </div>
                )}
            </div>
        </Bounded>
    );
};

export default Hero;
