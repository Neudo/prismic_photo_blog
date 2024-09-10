import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PostCard } from "@/components/PostCard";
import { SpeedInsights } from '@vercel/speed-insights/next';


// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");

  // Get all of the blog_post documents created on Prismic ordered by publication date
  const posts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    limit: 3,
  });

  return (
      <>
        <SliceZone slices={home.data.slices} components={components} />
        <SpeedInsights />

        {/* Map over each of the blog posts created and display a `PostCard` for it */}
        <section className=" grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl px-6 mx-auto my-[50px]">
          {posts.map((post) => (
              <PostCard key={post.id} post={post} />
          ))}
        </section>
      </>
  );
}
