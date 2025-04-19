import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = "alainbphoto";
// export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 */
const routes: prismic.ClientConfig["routes"] = [
  { type: "page", path: "/:uid" },
  { type: "page", uid: "home", path: "/" },
  { type: "blog_post", path: "/blog/:uid" },
  { type: "blog", path: "/blog" },
  { type: "contact", path: "/contact" },
  { type: "about", path: "/about" },
  { type: "gallery", path: "/galerie" },
  { type: "categorie", path: "/galerie/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};
