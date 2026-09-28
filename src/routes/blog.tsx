import { Link } from "react-router";
import { m } from "motion/react";

import type { Route } from "./+types/blog";
import Reveal from "@/components/Reveal";
import { formatDate, posts } from "@/lib/posts";
import { socialMeta } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const description = "Writing on software, infrastructure and DevOps.";

export const meta: Route.MetaFunction = () => [
  { title: "Blog · Arno Van Nieuwenhuyzen" },
  { name: "description", content: description },
  ...socialMeta({ title: "Blog", description, path: "/blog" }),
];

export default function Blog() {
  return (
    <section className="py-20">
      <Reveal from="top" eager>
        <h1 className="mb-10 text-4xl font-semibold tracking-tight">Blog</h1>
      </Reveal>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 80} eager>
                <m.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block"
                    prefetch="intent"
                  >
                    <Card className="transition-[box-shadow,--tw-ring-color] duration-300 group-hover:shadow-lg group-hover:ring-primary/60">
                      {post.image && (
                        <img
                          src={post.image.src}
                          alt={post.image.alt}
                          width={1200}
                          height={630}
                          loading="lazy"
                          className="aspect-[1200/630] w-full object-cover"
                        />
                      )}
                      <CardHeader>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <time
                            dateTime={post.date}
                            className="text-sm text-muted-foreground"
                          >
                            {formatDate(post.date)}
                          </time>
                          {post.tags && post.tags.length > 0 && (
                            <ul className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <li key={tag}>
                                  <Badge variant="outline">{tag}</Badge>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <CardTitle className="mt-1 text-xl group-hover:text-primary">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-sm/relaxed">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </m.div>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
