import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import { PostCard } from "@/components/PostCard";
import { RichText } from "@/components/RichText";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata(
  props: {
    params: Promise<Params>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params;
  const client = createClient();

  // Fetch the current blog post page being displayed by the UID of the page
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  /**
   * Fetch all of the blog posts in Prismic (max 2), excluding the current one, and ordered by publication date.
   *
   * We use this data to display our "recommended posts" section at the end of the blog post
   */
  const posts = await client.getAllByType("blog_post", {
    predicates: [prismic.filter.not("my.blog_post.uid", params.uid)],
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    limit: 3,
  });

  // Destructure out the content of the current page
  const { slices, title, publication_date, description, featured_image } =
    page.data;

  return (
    <div>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4">
        {/* Display the "hero" section of the blog post */}
        <section className="flex flex-col gap-12">
          <div className="flex w-full flex-col items-center gap-3">
            <div className="mt-4 flex flex-col items-center gap-6">
              <p className="border-b-2 pb-1 opacity-75">
                Publié le{" "}
                {new Date(
                  publication_date || new Date().toString(),
                ).toLocaleDateString()}
              </p>
              <div className="text-center">
                <RichText field={title} />
              </div>
            </div>
            <div className="text-center">
              <RichText field={description} />
            </div>
          </div>
          <PrismicNextImage
            field={featured_image}
            sizes="100vw"
            className="max-h-96 w-full max-w-7xl rounded-xl object-cover"
          />
        </section>

        {/* Display the content of the blog post */}
        <SliceZone slices={slices} components={components} />

        {/* Display the Recommended Posts section using the posts we requested earlier */}
        <h2 className="mb-0 px-4 text-3xl font-bold">Autres articles</h2>
        <section className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("blog_post");

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
