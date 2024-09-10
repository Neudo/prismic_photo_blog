'use client'
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";
import {useRef, useState} from "react";

//Plugins
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
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
    const [basicExampleOpen, setBasicExampleOpen] = useState(false);
    const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);
    const slideshowRef = useRef(null);

    console.log(slice.items[0])

    const slides = slice.items.map((item, index) => ({
        alt: item.image?.alt || 'Photo Alainb',
        height: item.image.dimensions?.height || 0,
        src: item.image.url || "",
        width: item.image.dimensions?.width || 0,
    }));


    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="flex flex-wrap justify-start w-full"
        >
            <ul className="relative p-2 list-none [columns:15rem] gap-x-4 w-full">
                {slice.items.map((item, index) => (
                    <li key={index} onClick={() => setIndex(index)} className="mt-[0] mx-[0] mb-4 break-inside-avoid cursor-pointer">
                        <PrismicNextImage
                            field={item.image}
                            className="w-full h-full block"
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
                plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
            />


        </section>
    );
};

export default Images;
