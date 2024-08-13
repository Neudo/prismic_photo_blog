import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ImageFull`.
 */
export type ImageFullProps = SliceComponentProps<Content.ImageFullSlice>;

/**
 * Component for "ImageFull" Slices.
 */
const ImageFull = ({ slice }: ImageFullProps): JSX.Element => {
  return (
      <section>
        <PrismicNextImage field={slice.primary.image} />
      </section>

  );
};

export default ImageFull;
