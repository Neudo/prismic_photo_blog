"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

//Plugins
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { log } from "console";

/**
 * Props for `Images`.
 */
export type ImagesProps = SliceComponentProps<Content.ImagesSlice>;

/**
 * Component for "Images" Slices.
 */

const Images = ({ slice }: ImagesProps): JSX.Element => {
  const [index, setIndex] = useState(-1);
  const [modelAreFiltered, setModelAreFiltered] = useState<boolean>(false);
  const [model, setModel] = useState<string | null>(null);
  const captionsRef = useRef(null);
  const modelList: string[] = [];
  slice.items.forEach((item: any) => {
    if (item.model_name && !modelList.includes(item.model_name)) {
      modelList.push(item.model_name);
    }
  });
  const slideshowRef = useRef(null);

  const filterModel = (model: string) => {
    setModelAreFiltered(true);
    setModel(null);
    setModel(model);
  };

  const [slides, setSlides] = useState(() =>
    slice.items.map((item) => ({
      image: item.image,
      model_name: item.model_name,
      src: item.image?.url || "",
      alt: item.image?.alt || "Photo Alainb",
      width: item.image?.dimensions?.width || 0,
      height: item.image?.dimensions?.height || 0,
      caption: item.image?.alt || "",
      description: item.image?.alt || "",
    })),
  );

  useEffect(() => {
    if (modelAreFiltered && model !== null) {
      setSlides(
        slice.items
          .map((item) => ({
            image: item.image,
            model_name: item.model_name,
            src: item.image?.url || "",
            alt: item.image?.alt || "Photo Alainb",
            width: item.image?.dimensions?.width || 0,
            height: item.image?.dimensions?.height || 0,
            caption: item.image?.alt || "",
            description: item.image?.alt || "",
          }))
          .filter((slide) => slide.model_name === model),
      );
    } else {
      setSlides(
        slice.items.map((item) => ({
          image: item.image,
          model_name: item.model_name,
          src: item.image?.url || "",
          alt: item.image?.alt || "Photo Alainb",
          width: item.image?.dimensions?.width || 0,
          height: item.image?.dimensions?.height || 0,
          caption: item.image?.alt || "",
          description: item.image?.alt || "",
        })),
      );
    }
  }, [modelAreFiltered, model, slice.items]);

  console.log(modelList);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex w-full flex-wrap justify-start"
    >
      {modelList.length > 0 && (
        <div className="bg-dark top-0 z-10 w-full py-4 md:sticky">
          <h2 className="mb-2 text-slate-200">Modèles</h2>
          <div className="flex w-full flex-wrap gap-2 pb-2">
            {modelAreFiltered && (
              <button
                onClick={() => setModelAreFiltered(false)}
                className="rounded bg-slate-200 p-2"
              >
                Tous les modèles
              </button>
            )}
            {modelList.map((model) => (
              <button
                onClick={() => filterModel(model)}
                className="rounded bg-slate-200 p-2"
                key={model}
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      )}
      <ul className="relative w-full list-none gap-x-4 [columns:15rem]">
        <AnimatePresence>
          {slides.map((slide, index) => (
            <motion.li
              key={slide.src || index}
              onClick={() => setIndex(index)}
              className="relative mx-[0] mb-4 mt-[0] cursor-pointer break-inside-avoid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <PrismicNextImage
                field={slide.image}
                className="block h-full w-full"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Lightbox
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
        captions={{ ref: captionsRef }}
        index={index}
        slides={slides}
        open={index >= 0}
        slideshow={{ ref: slideshowRef }}
        close={() => setIndex(-1)}
      />
    </section>
  );
};

export default Images;
