export default async function fetchAllTypesPages(client: any) {
  const pages = await client.getAllByType("page");
  const blogPosts = await client.getAllByType("blog_post");
  const galleries = await client.getAllByType("gallery");
  const categories = await client.getAllByType("categorie");

  // Génération des URLs basées sur le routeur que tu as partagé
  const pageUrls = pages.map((page: { uid: any }) => ({
    uid: page.uid,
    url: page.uid === "home" ? `/` : `/${page.uid}`, // Page d'accueil ou page classique
  }));

  const blogPostUrls = blogPosts.map((post: { uid: any }) => ({
    uid: post.uid,
    url: `/blog/${post.uid}`,
  }));

  const galleryUrls = galleries.map((gallery: { uid: any }) => ({
    uid: gallery.uid,
    url: `/gallery`, // Path fixe pour la galerie
  }));

  const categoryUrls = categories.map((category: { uid: any }) => ({
    uid: category.uid,
    url: `/gallery/${category.uid}`, // URL de catégorie de galerie
  }));

  return [...pageUrls, ...blogPostUrls, ...galleryUrls, ...categoryUrls];
}
