import React from "react";
import { createClient } from "@/prismicio";
import { PrismicLink } from "@prismicio/react";

export default async function HeroMenu() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <nav
      className="absolute left-1/2 top-[80%] z-20 hidden -translate-x-1/2 justify-center md:flex"
      aria-label="Main"
    >
      <ul className="flex gap-6 rounded-lg  bg-indigo-50/50 p-4 text-black transition ease-in hover:bg-indigo-50">
        {settings.data.navigation.map((item) => (
          <li key={item.label}>
            <PrismicLink
              className="inline-flex min-h-11 items-center hover:underline "
              field={item.link}
            >
              {item.label}
            </PrismicLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
