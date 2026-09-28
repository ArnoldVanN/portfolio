import { site } from "@/config";
import { posts } from "@/lib/posts";

export function loader() {
  const pages = [
    { path: "/", lastmod: posts[0]?.date },
    { path: "/blog", lastmod: posts[0]?.date },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastmod: post.date,
    })),
  ];

  const urls = pages
    .map(({ path, lastmod }) =>
      [
        "  <url>",
        `    <loc>${new URL(path, site.url).href}</loc>`,
        lastmod && `    <lastmod>${lastmod}</lastmod>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
