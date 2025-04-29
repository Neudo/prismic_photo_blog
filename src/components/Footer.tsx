import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { headers } from "next/headers";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  return (
    <footer className="flex flex-col items-center justify-between border-t border-slate-600 p-5 md:flex-row">
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
          <li>
            <a href="/mentions-legales">Mentions légales</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
