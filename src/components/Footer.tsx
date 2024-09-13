import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { headers } from "next/headers";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const headersList = headers();
  const referer = headersList.get("referer");

  return (
    <footer
      className={`flex ${referer && referer.includes("gallery") ? "hidden" : ""} mt-10 flex-col items-center justify-between border-t border-slate-600 p-5 md:flex-row`}
    >
      {/*<Logo />*/}

      <span className="sr-only">Alainbphoto.fr Home page</span>
      <nav>
        <ul className="flex flex-wrap gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.label}>
              <PrismicNextLink
                field={item.link}
                className="item-center min-h-11"
              >
                {item.label}{" "}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
