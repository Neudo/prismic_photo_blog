import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import {PostCard} from "@/components/PostCard";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
      .getSingle("blog")

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


export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
        .getSingle("blog")
        .catch(() => notFound());

  // Get all of the blog_post documents created on Prismic ordered by publication date
  const posts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return <div><SliceZone slices={page.data.slices} components={components}/>
    {/* Map over each of the blog posts created and display a `PostCard` for it */}
    <h1 className="container mx-auto max-w-screen-xl pt-16">Blog</h1>
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-16 container mx-auto max-w-screen-xl">
      {posts.map((post) => (
          <PostCard key={post.id} post={post}/>
      ))}
    </section>
  </div>
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
