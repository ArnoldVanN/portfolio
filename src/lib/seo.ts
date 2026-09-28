import type { MetaDescriptor } from "react-router";

import { site } from "@/config";

type SocialMetaOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: { src: string; alt: string };
};

export function socialMeta({
  title,
  description,
  path,
  type = "website",
  image = site.defaultImage,
}: SocialMetaOptions): MetaDescriptor[] {
  const url = new URL(path, site.url).href;

  return [
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:site_name", content: site.name },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: new URL(image.src, site.url).href },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: image.alt },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
