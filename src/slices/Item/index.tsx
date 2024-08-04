import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";

/**
 * Props for `Item`.
 */
export type ItemProps = SliceComponentProps<Content.ItemSlice>;

/**
 * Component for "Item" Slices.
 */
const Item = ({ slice }: ItemProps): JSX.Element => {
  return (
      <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
      >
        <PrismicRichText field={slice.primary.titre} />
        <PrismicNextImage field={slice.primary.image} />
        <PrismicRichText field={slice.primary.description} />
      </section>
  );
};

export default Item;
