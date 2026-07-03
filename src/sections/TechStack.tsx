import { useMemo, useState } from "react";
import { AnimatePresence, m } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Reveal from "@/components/Reveal";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import {
  databases,
  devops,
  langKinds,
  observability,
  programming,
  type LangKind,
  type Tech,
} from "@/config";

const techItemBase = cn(
  "group/tech flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-none border border-foreground/10 px-3 py-1.5 text-sm",
  "transition-colors duration-200",
  "hover:border-primary hover:bg-primary/5 hover:text-primary",
);

const hoverSpring = { type: "spring", stiffness: 300, damping: 22 } as const;

function TechItemContent({ tech, large }: { tech: Tech; large?: boolean }) {
  const iconSize = large ? "size-7" : "size-5";
  return tech.icon ? (
    <>
      <img
        src={tech.icon}
        alt=""
        aria-hidden
        className={cn(
          iconSize,
          "object-contain transition-transform duration-200 group-hover/tech:scale-110",
          tech.iconClassName,
        )}
      />
      <span>{tech.name}</span>
    </>
  ) : (
    <>
      <span
        aria-hidden
        className={cn(
          iconSize,
          "flex items-center justify-center bg-muted text-[10px] text-muted-foreground transition-transform duration-200 group-hover/tech:scale-110",
        )}
      >
        {tech.name.charAt(0)}
      </span>
      <span>{tech.name}</span>
    </>
  );
}

function TechGrid({ items, large }: { items: Tech[]; large?: boolean }) {
  const { ref, inView } = useInView<HTMLUListElement>();
  return (
    <ul ref={ref} className="flex max-w-2xl flex-wrap gap-2">
      {items.map((t, i) => (
        <m.li
          key={t.name}
          style={inView ? { animationDelay: `${i * 45}ms` } : undefined}
          whileHover={{ y: -6, transition: hoverSpring }}
          className={cn(
            techItemBase,
            inView
              ? "animate-in fade-in slide-in-from-left-3 fill-mode-both duration-500 ease-out"
              : "opacity-0",
          )}
        >
          <TechItemContent tech={t} large={large} />
        </m.li>
      ))}
    </ul>
  );
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
  exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

function LanguagesGrid({
  items,
  activeKey,
}: {
  items: Tech[];
  activeKey: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <AnimatePresence mode="wait">
        <m.ul
          key={activeKey}
          variants={listVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          exit="exit"
          className="flex max-w-2xl flex-wrap gap-2"
        >
          {items.map((t) => (
            <m.li
              key={t.name}
              variants={itemVariants}
              whileHover={{ y: -6, transition: hoverSpring }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={techItemBase}
            >
              <TechItemContent tech={t} large />
            </m.li>
          ))}
        </m.ul>
      </AnimatePresence>
    </div>
  );
}

const langFilters = ["All", ...langKinds] as const;
type LangFilter = (typeof langFilters)[number];

function LanguagesCard() {
  const [filter, setFilter] = useState<LangFilter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? programming
        : programming.filter((l) => l.kind.includes(filter as LangKind)),
    [filter],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Programming</CardTitle>
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(v) => v && setFilter(v as LangFilter)}
          variant="outline"
          size="sm"
          spacing={0}
          aria-label="Filter by frontend or backend"
        >
          {langFilters.map((f) => (
            <ToggleGroupItem key={f} value={f} className="text-xs">
              {f}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <LanguagesGrid items={visible} activeKey={filter} />
      </CardContent>
    </Card>
  );
}

function GroupCard({
  title,
  items,
  large,
  className,
}: {
  title: string;
  items: Tech[];
  large?: boolean;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <TechGrid items={items} large={large} />
      </CardContent>
    </Card>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="py-16 text-left">
      <Reveal>
        <h2 className="text-2xl font-semibold">What I work with</h2>
      </Reveal>

      <div className="mt-6 grid gap-3">
        <Reveal>
          <LanguagesCard />
        </Reveal>
        <div className="grid items-stretch gap-3 sm:grid-cols-2">
          <Reveal className="flex">
            <GroupCard title="Databases" items={databases} className="w-full" />
          </Reveal>
          <Reveal className="flex" delay={100}>
            <GroupCard
              title="Observability"
              items={observability}
              className="w-full"
            />
          </Reveal>
        </div>
        <Reveal>
          <GroupCard title="DevOps" items={devops} />
        </Reveal>
      </div>
    </section>
  );
}
