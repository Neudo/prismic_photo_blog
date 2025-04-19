import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Filter from "@/components/Filter";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
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
        <SliceZone slices={page.data.slices} components={components} />
      </Bounded>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
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
