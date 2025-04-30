import React from "react";
import { PrismicLink } from "@prismicio/react";
import { useMenu } from "@/hooks/use-menu";

export default function HeroMenu() {
  const settings = useMenu();
  if (!settings) return null;
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
