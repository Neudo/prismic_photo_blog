import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";
import Bounded from "@/components/Bounded";

/**
 * Props for `TextImage`.
 */
export type TextImageProps = SliceComponentProps<Content.TextImageSlice>;

/**
 * Component for "TextImage" Slices.
 */
const TextImage = ({ slice }: TextImageProps): JSX.Element => {
  return (
      <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
      >
        <div className={`flex flex-wrap items-center justify-between ${slice.primary.position ? '' : 'flex-row-reverse'}`}>
          <div className="mb-6 md:w-[50%]">
            <PrismicRichText field={slice.primary.title} />
            <PrismicRichText field={slice.primary.text} />
          </div>
          <div className="md:w-[45%]">
            <PrismicNextImage className="rounded-2xl" field={slice.primary.image} />
          </div>
        </div>
      </Bounded>
  );
};

export default TextImage;
