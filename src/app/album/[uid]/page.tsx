import { Metadata } from "next";
import { notFound } from "next/navigation";
import {  SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
type Params = { uid: string };

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("album", params.uid)
    .catch(() => notFound());

    
  return (
    <div className="bg-dark min-h-screen">
      <Link
        className="flex items-center gap-4 bg-slate-200 p-4"
        href="/album"
      >
        <ArrowLeftIcon className="h-6 w-6" />
        Retour
      </Link>
      <Bounded>
        {page.data.slices.length > 0 ? (
          <SliceZone slices={page.data.slices} components={components} />
        ) : (
          <>
            <h1 className="text-4xl font-bold text-slate-100 mb-6">Aucune photo pour le moment.</h1>
            <p className="text-slate-300">Veuillez patienter, je suis encore entrain de travailler dessus.</p>
          </>
        )}
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
    .getByUID("album", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("album");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
