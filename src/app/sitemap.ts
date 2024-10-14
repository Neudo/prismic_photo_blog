import { MetadataRoute } from "next";
import fetchAllTypesPages from "@/utils/fetchAllTypesPages";
import { createClient } from "@/prismicio";

const baseUrl = process.env.SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // Récupération des pages dynamiques
  const dynamicPages = await fetchAllTypesPages(client);

  // Mappage des pages dynamiques
  const dynamicRoutes = dynamicPages.map((page) => ({
    url: `${baseUrl}${page.url}`, // Ajoute le baseUrl aux chemins
    lastModified: new Date().toISOString(),
  }));

  // Routes statiques
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
    },
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
