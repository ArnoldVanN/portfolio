import type { ComponentType } from "react";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  image?: { src: string; alt: string };
};

type PostModule = {
  default: ComponentType;
  frontmatter: PostFrontmatter;
};

const modules = import.meta.glob<PostModule>("../content/blog/*.mdx", {
  eager: true,
});

export type Post = PostFrontmatter & { slug: string; Content: ComponentType };

export const posts: Post[] = Object.entries(modules)
  .map(([file, mod]) => ({
    ...mod.frontmatter,
    slug: file
      .split("/")
      .pop()!
      .replace(/\.mdx$/, ""),
    Content: mod.default,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
