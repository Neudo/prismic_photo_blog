import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";

/**
 * Props for `ImageFull`.
 */
export type ImageFullProps = SliceComponentProps<Content.ImageFullSlice>;

/**
 * Component for "ImageFull" Slices.
 */
const ImageFull = ({ slice }: ImageFullProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for image_full (variation: {slice.variation}) Slices
    </Bounded>
  );
};

export default ImageFull;
