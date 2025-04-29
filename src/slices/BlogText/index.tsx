import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

import type { JSX } from "react";

/**
 * Props for `BlogText`.
 */
export type BlogTextProps = SliceComponentProps<Content.BlogTextSlice>;

/**
 * Component for "BlogText" Slices.
 */
const BlogText = ({ slice }: BlogTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.body} />
    </section>
  );
};

export default BlogText;
