import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import Bounded from "@/components/Bounded";

/**
 * Props for `Steps`.
 */
export type StepsProps = SliceComponentProps<Content.StepsSlice>;

/**
 * Component for "Steps" Slices.
 */
const Steps = ({ slice }: StepsProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="text-white bg-primary-green min-h-[75vh]"
        >
            <div className="flex items-start justify-between ">
                <div className="w-[50%]">
                    <PrismicRichText field={slice.primary.titre} />
                </div>
                <ul className="w-[60%] max-h-[240px] overflow-hidden " >
                    {slice.items.map((item, index) => (
                        <div key={index} className="mb-[80px]">
                            <PrismicRichText field={item.etapes} />
                        </div>
                    ))}
                </ul>
            </div>
        </Bounded>
    );
};

export default Steps;
