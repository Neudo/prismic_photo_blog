import { Metadata } from "next";
import { createClient } from "@/prismicio";
import PageContact from "@/components/PageContact";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact");
  const data = page.data;
  const settings = await client.getSingle("settings");

  return <PageContact data={data} settings={settings} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("contact");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
