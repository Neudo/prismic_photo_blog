import { Metadata } from "next";
import { createClient } from "@/prismicio";
import SwiperGallery from "@/components/SwiperGallery";
import Link from "next/link";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("gallery");
  const categories = await client.getAllByType("categorie");

  return (
    <div className="bg-dark min-h-[100vh]">
      <h1 className="py-16 text-center text-slate-100">Galerie photo</h1>
      <SwiperGallery data={categories} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("gallery");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
