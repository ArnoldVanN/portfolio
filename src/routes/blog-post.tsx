import { Link, data } from "react-router";

import type { Route } from "./+types/blog-post";
import { formatDate, getPost } from "@/lib/posts";
import { socialMeta } from "@/lib/seo";
import { site } from "@/config";

import { Badge } from "@/components/ui/badge";

export function loader({ params }: Route.LoaderArgs) {
  const post = getPost(params.slug);
  if (!post) throw data(null, { status: 404 });

  const { Content: _, ...frontmatter } = post;
  return frontmatter;
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [{ title: "Post not found" }];
  const title = `${loaderData.title} · Arno Van Nieuwenhuyzen`;

  return [
    { title },
    { name: "description", content: loaderData.description },
    ...socialMeta({
      title: loaderData.title,
      description: loaderData.description,
      path: `/blog/${loaderData.slug}`,
      type: "article",
      image: loaderData.image,
    }),
    { property: "article:published_time", content: loaderData.date },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: loaderData.title,
        description: loaderData.description,
        datePublished: loaderData.date,
        url: new URL(`/blog/${loaderData.slug}`, site.url).href,
        image: new URL((loaderData.image ?? site.defaultImage).src, site.url)
          .href,
        keywords: loaderData.tags,
        author: { "@type": "Person", name: site.name, url: site.url },
      },
    },
  ];
};

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { Content } = getPost(loaderData.slug)!;

  return (
    <article className="py-20">
      <Link
        to="/blog"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ← All posts
      </Link>
      <header className="mt-6 mb-10">
        <time
          dateTime={loaderData.date}
          className="text-sm text-muted-foreground"
        >
          {formatDate(loaderData.date)}
        </time>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            {loaderData.title}
          </h1>
          {loaderData.tags && loaderData.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {loaderData.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline">{tag}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      {loaderData.image && (
        <img
          src={loaderData.image.src}
          alt={loaderData.image.alt}
          width={1200}
          height={630}
          className="mb-10 aspect-[1200/630] w-full object-cover ring-1 ring-foreground/10"
        />
      )}
      <div className="prose max-w-none dark:prose-invert prose-a:text-primary prose-pre:rounded-none prose-code:before:content-none prose-code:after:content-none">
        <Content />
      </div>
    </article>
  );
}
