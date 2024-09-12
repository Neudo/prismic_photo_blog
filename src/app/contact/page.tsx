import { Metadata } from "next";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact");
  const data = page.data;
  const settings = await client.getSingle("settings");

  return (
    <div className="flex min-h-screen">
      <div className="min-h-screen md:w-1/2">
        <PrismicNextImage
          className="h-full w-full object-cover"
          field={data.image}
        />
      </div>
      <div className="px-[100px] pt-[130px] md:w-1/2">
        <RichText field={data.contact_text} />
        {/*Socials links*/}
        <div className="mt-10 flex gap-4">
          {settings.data.facebook && (
            <PrismicNextLink field={settings.data.facebook}>
              <FaFacebook className="text-3xl text-[#3b5998]" />
            </PrismicNextLink>
          )}
          {settings.data.tiktok && (
            <PrismicNextLink field={settings.data.tiktok}>
              <FaTiktok className="text-3xl" />
            </PrismicNextLink>
          )}
          {settings.data.instagram && (
            <PrismicNextLink field={settings.data.instagram}>
              <FaInstagram className="text-3xl text-[#E1306C]" />
            </PrismicNextLink>
          )}
          {settings.data.youtube && (
            <PrismicNextLink field={settings.data.youtube}>
              <FaYoutube className="text-3xl text-[#FF0000]" />
            </PrismicNextLink>
          )}
        </div>
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
