// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type AboutDocumentDataSlicesSlice = never;

/**
 * Content for À propos documents
 */
interface AboutDocumentData {
  /**
   * Slice Zone field in *À propos*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: about.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<AboutDocumentDataSlicesSlice> /**
   * Meta Description field in *À propos*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: about.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *À propos*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: about.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *À propos*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: about.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * À propos document from Prismic
 *
 * - **API ID**: `about`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<AboutDocumentData>, "about", Lang>;

type BlogDocumentDataSlicesSlice = RichTextSlice;

/**
 * Content for Liste des articles de blog documents
 */
interface BlogDocumentData {
  /**
   * Titre field in *Liste des articles de blog*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: blog.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.RichTextField;

  /**
   * Article mis en avant field in *Liste des articles de blog*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: blog.featured_post
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  featured_post: prismic.ContentRelationshipField<"blog_post">;

  /**
   * Slice Zone field in *Liste des articles de blog*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: blog.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<BlogDocumentDataSlicesSlice> /**
   * Meta Description field in *Liste des articles de blog*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: blog.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Liste des articles de blog*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: blog.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Liste des articles de blog*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: blog.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Liste des articles de blog document from Prismic
 *
 * - **API ID**: `blog`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<BlogDocumentData>, "blog", Lang>;

type BlogPostDocumentDataSlicesSlice =
  | ImageFullSlice
  | BlogTextSlice
  | BlogTitleSlice
  | RichTextSlice;

/**
 * Content for Article de blog documents
 */
interface BlogPostDocumentData {
  /**
   * Titre field in *Article de blog*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Description field in *Article de blog*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Image mise en avant field in *Article de blog*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.featured_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  featured_image: prismic.ImageField<never>;

  /**
   * Publication date field in *Article de blog*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.publication_date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  publication_date: prismic.DateField;

  /**
   * Slice Zone field in *Article de blog*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<BlogPostDocumentDataSlicesSlice> /**
   * Meta Title field in *Article de blog*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: blog_post.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Article de blog*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: blog_post.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Article de blog*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Article de blog document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<BlogPostDocumentData>,
    "blog_post",
    Lang
  >;

type ContactDocumentDataSlicesSlice = never;

/**
 * Content for Contact documents
 */
interface ContactDocumentData {
  /**
   * Slice Zone field in *Contact*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: contact.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ContactDocumentDataSlicesSlice> /**
   * Meta Description field in *Contact*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: contact.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Contact*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: contact.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Contact*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: contact.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Contact document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<ContactDocumentData>,
    "contact",
    Lang
  >;

type GalleryDocumentDataSlicesSlice = never;

/**
 * Content for Gallerie photo documents
 */
interface GalleryDocumentData {
  /**
   * Titre field in *Gallerie photo*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: gallery.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.RichTextField;

  /**
   * Slice Zone field in *Gallerie photo*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: gallery.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<GalleryDocumentDataSlicesSlice> /**
   * Meta Description field in *Gallerie photo*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: gallery.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Gallerie photo*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: gallery.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Gallerie photo*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: gallery.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Gallerie photo document from Prismic
 *
 * - **API ID**: `gallery`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type GalleryDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<GalleryDocumentData>,
    "gallery",
    Lang
  >;

type PageDocumentDataSlicesSlice =
  | ItemSlice
  | StepsSlice
  | TextImageSlice
  | BlogPostSlice
  | ImageFullSlice
  | HeroSlice
  | RichTextSlice;

/**
 * Content for Page documents
 */
interface PageDocumentData {
  /**
   * Title field in *Page*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: page.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Slice Zone field in *Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
   * Meta Title field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Page*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

type RecetteDocumentDataSlicesSlice = RichTextSlice | HeroSlice;

/**
 * Content for Recette documents
 */
interface RecetteDocumentData {
  /**
   * Slice Zone field in *Recette*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: recette.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<RecetteDocumentDataSlicesSlice> /**
   * Meta Description field in *Recette*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: recette.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Recette*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: recette.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Recette*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: recette.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Recette document from Prismic
 *
 * - **API ID**: `recette`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RecetteDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<RecetteDocumentData>,
    "recette",
    Lang
  >;

/**
 * Item in *Settings → Navigation*
 */
export interface SettingsDocumentDataNavigationItem {
  /**
   * Link field in *Settings → Navigation*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Label field in *Settings → Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[].label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;
}

/**
 * Item in *Settings → Catégories*
 */
export interface SettingsDocumentDataCategoriesItem {
  /**
   * Image field in *Settings → Catégories*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.categories[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Nom de la catégorie field in *Settings → Catégories*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.categories[].category_name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  category_name: prismic.KeyTextField;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
  /**
   * Site title field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.site_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  site_title: prismic.KeyTextField;

  /**
   * Meta description field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Fallback OG Image field in *Settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.fallback_og_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  fallback_og_image: prismic.ImageField<never>;

  /**
   * Navigation field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navigation: prismic.GroupField<
    Simplify<SettingsDocumentDataNavigationItem>
  > /**
   * Facebook field in *Settings*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.facebook
   * - **Tab**: Réseaux sociaux
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */;
  facebook: prismic.LinkField;

  /**
   * Tiktok field in *Settings*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.tiktok
   * - **Tab**: Réseaux sociaux
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  tiktok: prismic.LinkField;

  /**
   * Instagram field in *Settings*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.instagram
   * - **Tab**: Réseaux sociaux
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  instagram: prismic.LinkField;

  /**
   * Youtube field in *Settings*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.youtube
   * - **Tab**: Réseaux sociaux
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  youtube: prismic.LinkField /**
   * Catégories field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.categories[]
   * - **Tab**: Catégories de photo
   * - **Documentation**: https://prismic.io/docs/field#group
   */;
  categories: prismic.GroupField<Simplify<SettingsDocumentDataCategoriesItem>>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    "settings",
    Lang
  >;

export type AllDocumentTypes =
  | AboutDocument
  | BlogDocument
  | BlogPostDocument
  | ContactDocument
  | GalleryDocument
  | PageDocument
  | RecetteDocument
  | SettingsDocument;

/**
 * Primary content in *BlogPost → Primary*
 */
export interface BlogPostSliceDefaultPrimary {
  /**
   * Titre field in *BlogPost → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.primary.titre
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  titre: prismic.TitleField;

  /**
   * Body field in *BlogPost → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;
}

/**
 * Primary content in *BlogPost → Items*
 */
export interface BlogPostSliceDefaultItem {
  /**
   * Article de blog field in *BlogPost → Items*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.items[].blog_post
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  blog_post: prismic.ContentRelationshipField;
}

/**
 * Default variation for BlogPost Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogPostSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<BlogPostSliceDefaultPrimary>,
  Simplify<BlogPostSliceDefaultItem>
>;

/**
 * Slice variation for *BlogPost*
 */
type BlogPostSliceVariation = BlogPostSliceDefault;

/**
 * BlogPost Shared Slice
 *
 * - **API ID**: `blog_post`
 * - **Description**: BlogPost
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogPostSlice = prismic.SharedSlice<
  "blog_post",
  BlogPostSliceVariation
>;

/**
 * Primary content in *BlogText → Primary*
 */
export interface BlogTextSliceDefaultPrimary {
  /**
   * Corps du texte field in *BlogText → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_text.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;
}

/**
 * Default variation for BlogText Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogTextSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<BlogTextSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *BlogText*
 */
type BlogTextSliceVariation = BlogTextSliceDefault;

/**
 * BlogText Shared Slice
 *
 * - **API ID**: `blog_text`
 * - **Description**: BlogText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogTextSlice = prismic.SharedSlice<
  "blog_text",
  BlogTextSliceVariation
>;

/**
 * Primary content in *BlogTitle → Primary*
 */
export interface BlogTitleSliceDefaultPrimary {
  /**
   * Titre field in *BlogTitle → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_title.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;
}

/**
 * Default variation for BlogTitle Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogTitleSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<BlogTitleSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *BlogTitle*
 */
type BlogTitleSliceVariation = BlogTitleSliceDefault;

/**
 * BlogTitle Shared Slice
 *
 * - **API ID**: `blog_title`
 * - **Description**: BlogTitle
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BlogTitleSlice = prismic.SharedSlice<
  "blog_title",
  BlogTitleSliceVariation
>;

/**
 * Primary content in *ContactForm → Primary*
 */
export interface ContactFormSliceDefaultPrimary {
  /**
   * Titre field in *ContactForm → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: contact_form.primary.titre
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  titre: prismic.TitleField;
}

/**
 * Default variation for ContactForm Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContactFormSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ContactFormSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ContactForm*
 */
type ContactFormSliceVariation = ContactFormSliceDefault;

/**
 * ContactForm Shared Slice
 *
 * - **API ID**: `contact_form`
 * - **Description**: ContactForm
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContactFormSlice = prismic.SharedSlice<
  "contact_form",
  ContactFormSliceVariation
>;

/**
 * Primary content in *HomeHero → Primary*
 */
export interface HeroSliceDefaultPrimary {
  /**
   * Titre field in *HomeHero → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Sous titre field in *HomeHero → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.primary.subTitle
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  subTitle: prismic.RichTextField;
}

/**
 * Primary content in *HomeHero → Items*
 */
export interface HeroSliceDefaultItem {
  /**
   * Liste des images field in *HomeHero → Items*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.items[].image_list
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image_list: prismic.ImageField<never>;
}

/**
 * Default variation for HomeHero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeroSliceDefaultPrimary>,
  Simplify<HeroSliceDefaultItem>
>;

/**
 * Slice variation for *HomeHero*
 */
type HeroSliceVariation = HeroSliceDefault;

/**
 * HomeHero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *ImageFull → Primary*
 */
export interface ImageFullSliceDefaultPrimary {
  /**
   * image field in *ImageFull → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: image_full.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;
}

/**
 * Default variation for ImageFull Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageFullSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ImageFullSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ImageFull*
 */
type ImageFullSliceVariation = ImageFullSliceDefault;

/**
 * ImageFull Shared Slice
 *
 * - **API ID**: `image_full`
 * - **Description**: ImageFull
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageFullSlice = prismic.SharedSlice<
  "image_full",
  ImageFullSliceVariation
>;

/**
 * Primary content in *Item → Primary*
 */
export interface ItemSliceDefaultPrimary {
  /**
   * Titre field in *Item → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: item.primary.titre
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  titre: prismic.RichTextField;

  /**
   * Image field in *Item → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: item.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Description field in *Item → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: item.primary.description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;
}

/**
 * Default variation for Item Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ItemSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ItemSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Item*
 */
type ItemSliceVariation = ItemSliceDefault;

/**
 * Item Shared Slice
 *
 * - **API ID**: `item`
 * - **Description**: Item
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ItemSlice = prismic.SharedSlice<"item", ItemSliceVariation>;

/**
 * Primary content in *RichText → Primary*
 */
export interface RichTextSliceDefaultPrimary {
  /**
   * Content field in *RichText → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Lorem ipsum...
   * - **API ID Path**: rich_text.primary.content
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;
}

/**
 * Default variation for RichText Slice
 *
 * - **API ID**: `default`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<RichTextSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *RichText*
 */
type RichTextSliceVariation = RichTextSliceDefault;

/**
 * RichText Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSlice = prismic.SharedSlice<
  "rich_text",
  RichTextSliceVariation
>;

/**
 * Primary content in *Steps → Primary*
 */
export interface StepsSliceDefaultPrimary {
  /**
   * Titre field in *Steps → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: steps.primary.titre
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  titre: prismic.RichTextField;
}

/**
 * Primary content in *Steps → Items*
 */
export interface StepsSliceDefaultItem {
  /**
   * Étapes field in *Steps → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: steps.items[].etapes
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  etapes: prismic.RichTextField;
}

/**
 * Default variation for Steps Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type StepsSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<StepsSliceDefaultPrimary>,
  Simplify<StepsSliceDefaultItem>
>;

/**
 * Slice variation for *Steps*
 */
type StepsSliceVariation = StepsSliceDefault;

/**
 * Steps Shared Slice
 *
 * - **API ID**: `steps`
 * - **Description**: Steps
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type StepsSlice = prismic.SharedSlice<"steps", StepsSliceVariation>;

/**
 * Primary content in *TextImage → Primary*
 */
export interface TextImageSliceDefaultPrimary {
  /**
   * Titre field in *TextImage → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: text_image.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.RichTextField;

  /**
   * Texte field in *TextImage → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: text_image.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;

  /**
   * Image field in *TextImage → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: text_image.primary.image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Position de l'image field in *TextImage → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: text_image.primary.position
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  position: prismic.BooleanField;
}

/**
 * Default variation for TextImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextImageSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<TextImageSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *TextImage*
 */
type TextImageSliceVariation = TextImageSliceDefault;

/**
 * TextImage Shared Slice
 *
 * - **API ID**: `text_image`
 * - **Description**: TextImage
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextImageSlice = prismic.SharedSlice<
  "text_image",
  TextImageSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      AboutDocument,
      AboutDocumentData,
      AboutDocumentDataSlicesSlice,
      BlogDocument,
      BlogDocumentData,
      BlogDocumentDataSlicesSlice,
      BlogPostDocument,
      BlogPostDocumentData,
      BlogPostDocumentDataSlicesSlice,
      ContactDocument,
      ContactDocumentData,
      ContactDocumentDataSlicesSlice,
      GalleryDocument,
      GalleryDocumentData,
      GalleryDocumentDataSlicesSlice,
      PageDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      RecetteDocument,
      RecetteDocumentData,
      RecetteDocumentDataSlicesSlice,
      SettingsDocument,
      SettingsDocumentData,
      SettingsDocumentDataNavigationItem,
      SettingsDocumentDataCategoriesItem,
      AllDocumentTypes,
      BlogPostSlice,
      BlogPostSliceDefaultPrimary,
      BlogPostSliceDefaultItem,
      BlogPostSliceVariation,
      BlogPostSliceDefault,
      BlogTextSlice,
      BlogTextSliceDefaultPrimary,
      BlogTextSliceVariation,
      BlogTextSliceDefault,
      BlogTitleSlice,
      BlogTitleSliceDefaultPrimary,
      BlogTitleSliceVariation,
      BlogTitleSliceDefault,
      ContactFormSlice,
      ContactFormSliceDefaultPrimary,
      ContactFormSliceVariation,
      ContactFormSliceDefault,
      HeroSlice,
      HeroSliceDefaultPrimary,
      HeroSliceDefaultItem,
      HeroSliceVariation,
      HeroSliceDefault,
      ImageFullSlice,
      ImageFullSliceDefaultPrimary,
      ImageFullSliceVariation,
      ImageFullSliceDefault,
      ItemSlice,
      ItemSliceDefaultPrimary,
      ItemSliceVariation,
      ItemSliceDefault,
      RichTextSlice,
      RichTextSliceDefaultPrimary,
      RichTextSliceVariation,
      RichTextSliceDefault,
      StepsSlice,
      StepsSliceDefaultPrimary,
      StepsSliceDefaultItem,
      StepsSliceVariation,
      StepsSliceDefault,
      TextImageSlice,
      TextImageSliceDefaultPrimary,
      TextImageSliceVariation,
      TextImageSliceDefault,
    };
  }
}
