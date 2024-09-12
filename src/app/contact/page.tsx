import { Metadata } from "next";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { createClient } from "@/prismicio";
import { FaEnvelope } from "react-icons/fa";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact");
  const data = page.data;
  const settings = await client.getSingle("settings");

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="w-full lg:min-h-screen lg:w-1/2">
        <PrismicNextImage
          className="object-cover lg:h-full lg:w-full"
          field={data.image}
        />
      </div>
      <div className="w-full p-6 lg:w-1/2 lg:px-[100px] lg:pt-[130px]">
        <RichText field={data.contact_text} />

        <div className="mt-6">
          {settings.data.mail && (
            <a
              href={`mailto:${settings.data.mail}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-2xl hover:underline"
            >
              <FaEnvelope className="mr-3 text-6xl" /> Envoyez moi un mail
            </a>
          )}
        </div>

        {/*Socials links*/}
        <div className="mt-10 flex gap-4">
          {settings.data.facebook && (
            <PrismicNextLink field={settings.data.facebook}>
              <FaFacebook className="text-3xl text-[#3b5998] duration-300 ease-out hover:scale-105 " />
            </PrismicNextLink>
          )}
          {settings.data.tiktok && (
            <PrismicNextLink field={settings.data.tiktok}>
              <FaTiktok className="text-3xl duration-300 ease-out hover:scale-105 " />
            </PrismicNextLink>
          )}
          {settings.data.instagram && (
            <PrismicNextLink field={settings.data.instagram}>
              <FaInstagram className="text-3xl text-[#E1306C] duration-300 ease-out hover:scale-105 " />
            </PrismicNextLink>
          )}
          {settings.data.youtube && (
            <PrismicNextLink field={settings.data.youtube}>
              <FaYoutube className="text-3xl text-[#FF0000] duration-300 ease-out hover:scale-105 " />
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
