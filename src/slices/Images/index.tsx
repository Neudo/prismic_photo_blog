import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";

/**
 * Props for `Images`.
 */
export type ImagesProps = SliceComponentProps<Content.ImagesSlice>;

/**
 * Component for "Images" Slices.
 */
const Images = ({ slice }: ImagesProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="flex flex-wrap justify-start w-full"
        >

                    <ul  className="relative p-2 list-none [columns:15rem] gap-x-4 w-full">
                {slice.items.map((item, index) => (
                       <li key={index} className="mt-[0] mx-[0] mb-4 break-inside-avoid">
                           <PrismicNextImage
                               field={item.image}
                               className="w-full h-full block"
                           />
                       </li>
                ))}
                    </ul>
        </section>
    );
};

export default Images;
