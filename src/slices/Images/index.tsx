import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";

/**
 * Props for `Images`.
 */
export type ImagesProps = SliceComponentProps<Content.ImagesSlice>;

/**
 * Component for "Images" Slices.
 */
const Images = ({ slice }: ImagesProps): JSX.Element => {
  return (
      <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
      >
          {slice.items.map((item, index) => (
              <div key={index} className="mb-[20px] h-auto w-[500px]">
                  <PrismicNextImage field={item.image} />
              </div>
          ))}
      </section>
  );
};

export default Images;
