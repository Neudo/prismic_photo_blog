import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      Placeholder component for blog_text (variation: {slice.variation}) Slices
    </section>
  );
};

export default BlogText;
