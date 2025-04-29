import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { RichText } from "@/components/RichText";

type Params = { uid: string };

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("categorie", params.uid)
    .catch(() => notFound());

  return (
    <div className="bg-dark min-h-screen">
      <Link
        className="flex items-center gap-4 bg-slate-200 p-4"
        href="/galerie"
      >
        <ArrowLeftIcon className="h-6 w-6" />
        Retour à la galerie
      </Link>
      <Bounded>
        <h1 className="mb-8 text-4xl font-bold text-slate-100 md:mb-16">
          {page.data.name}
        </h1>
        {page.data.description && (
          <div className="mb-8 flex flex-col gap-5 rounded bg-[#242424] p-8 text-slate-300">
            <RichText field={page.data.description} />
          </div>
        )}
        <SliceZone slices={page.data.slices} components={components} />
      </Bounded>
    </div>
  );
}

export async function generateMetadata(
  props: {
    params: Promise<Params>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("categorie", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("categorie");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
