import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageSlice`.
 */
export type ImageSliceProps = SliceComponentProps<Content.ImageSliceSlice>;

/**
 * Component for "ImageSlice" Slices.
 */
const ImageSlice: FC<ImageSliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for image_slice (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ImageSlice;
