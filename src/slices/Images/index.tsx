"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useRef, useState } from "react";

//Plugins
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/**
 * Props for `Images`.
 */
export type ImagesProps = SliceComponentProps<Content.ImagesSlice>;

/**
 * Component for "Images" Slices.
 */

const Images = ({ slice }: ImagesProps): JSX.Element => {
  const [index, setIndex] = useState(-1);
  const slideshowRef = useRef(null);

  const slides = slice.items.map((item, index) => ({
    alt: item.image?.alt || "Photo Alainb",
    height: item.image.dimensions?.height || 0,
    src: item.image.url || "",
    width: item.image.dimensions?.width || 0,
  }));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex w-full flex-wrap justify-start"
    >
      <ul className="relative w-full list-none gap-x-4 p-2 [columns:15rem]">
        {slice.items.map((item, index) => (
          <li
            key={index}
            onClick={() => setIndex(index)}
            className="mx-[0] mb-4 mt-[0] cursor-pointer break-inside-avoid"
          >
            <PrismicNextImage
              field={item.image}
              className="block h-full w-full"
            />
          </li>
        ))}
      </ul>

      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        slideshow={{ ref: slideshowRef }}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </section>
  );
};

export default Images;
