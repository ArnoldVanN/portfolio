import { readdirSync } from "node:fs";
import type { Config } from "@react-router/dev/config";

const slugs = readdirSync("src/content/blog")
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));

export default {
  appDirectory: "src",
  ssr: false,
  prerender: ({ getStaticPaths }) => [
    ...getStaticPaths(),
    ...slugs.map((slug) => `/blog/${slug}`),
  ],
} satisfies Config;
