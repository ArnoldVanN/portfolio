import { m } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import { projects } from "@/config";

export default function Projects() {
  return (
    <section id="projects" className="py-16 text-left">
      <Reveal>
        <h2 className="text-2xl font-semibold">What I've built</h2>
      </Reveal>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 3) * 100} className="flex">
            <m.div
              layout
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex w-full"
            >
              <Card className="w-full transition-[box-shadow,--tw-ring-color] duration-300 hover:shadow-lg hover:ring-primary/60">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex flex-wrap gap-2 pb-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Badge variant="outline">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                  {project.href && (
                    <div className="mt-auto flex justify-end pt-2">
                      <Button asChild>
                        <a href={project.href} target="_blank" rel="noreferrer">
                          View →
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </m.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
