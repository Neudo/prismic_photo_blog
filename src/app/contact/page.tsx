import { Metadata } from "next";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";

import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact");
  const data = page.data;

  return (
    <div className="flex">
      <div className="w-1/2">
        <PrismicNextImage field={data.image} />
      </div>
      <div className="w-1/2">
        <RichText field={data.contact_text} />
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("contact");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
