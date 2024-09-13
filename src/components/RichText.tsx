import { RichTextField } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicLink,
  PrismicRichText,
} from "@prismicio/react";

export const richTextComponents: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children }) => (
    <h1 className="text-3xl font-bold lg:text-6xl">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="text-3xl font-bold lg:text-5xl">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mb-3 text-2xl font-bold lg:mb-6 lg:text-4xl">{children}</h3>
  ),
  paragraph: ({ children }) => <p>{children}</p>,
  hyperlink: ({ children, node }) => (
    <PrismicLink field={node.data} className="font-bold underline">
      {children}
    </PrismicLink>
  ),
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return <PrismicRichText field={field} components={richTextComponents} />;
};
