import {Content, isFilled} from "@prismicio/client";
import {SliceComponentProps, PrismicRichText, PrismicText} from "@prismicio/react";
import {createClient} from "@/prismicio";
import {PrismicNextImage, PrismicNextLink} from "@prismicio/next";
import clsx from "clsx";
import Bounded from "@/components/Bounded";
import { RichText } from "@/components/RichText";

/**
 * Props for `BlogPost`.
 */
export type BlogPostProps = SliceComponentProps<Content.BlogPostSlice>;

/**
 * Component for "BlogPost" Slices.
 */
const BlogPost = async ({slice }: BlogPostProps): Promise<JSX.Element> => {

    const client = createClient()

    const blogPosts = await Promise.all(
        slice.items.map(async (item) => {
            if (isFilled.contentRelationship(item.blog_post)) {
                return await client.getByID<Content.BlogPostDocument>(
                    item.blog_post.id
                )
            }
        })
    )

    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <h2 className="max-w-2xl text-balance text-center text-5xl md:text-7xl font-medium" ><PrismicText field={slice.primary.titre} /></h2>
            <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300 ">
                <PrismicText field={slice.primary.body} />
            </div>

            <div className="mt-20 grid gap-16">
                {blogPosts.map((blogPost:any, index) => (
                    <div key={blogPost.id} className="grid gap-4 relative">
                        <h3> <PrismicText field={blogPost.data.title} /></h3>
                        <RichText field={blogPost.data.description} />

                        <PrismicNextLink document={blogPost} className="after:absolute after:inset-0 hover:underline" >
                            Lire l article
                        </PrismicNextLink>

                        <PrismicNextImage field={blogPost.data.main_image} quality={100}
                                          className={clsx('w-full h-96 object-cover', 'after:absolute after:inset-0', 'after:z-[-1]')}
                        />
                    </div>
                ))}
            </div>
        </Bounded>
    );
};

export default BlogPost;
