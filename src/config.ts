export const nav = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  paragraphs: [
    "I am a Full-Stack developer from Belgium.",
    "Well versed in the entire development process from architecture design to CI, monitoring and maintenance. I build anything from CLI tools to distributed systems, applying DevOps and security best practices",
  ],
} as const;

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Aquila Hosting",
    description:
      "A commercial game server hosting platform currently in operation",
    tags: ["Go", "TypeScript", "Kubernetes"],
    href: "https://aquilahosting.com",
  },
  {
    title: "Monotrack",
    description: "A tool to ease the pains of CI in a monorepo",
    tags: ["Go", "CI/CD"],
    href: "https://github.com/arnoldvann/monotrack",
  },
  {
    title: "Artist portfolio",
    description: "A simple but elegant static site",
    tags: ["React", "Vite", "GitHub Actions"],
    href: "https://greetvandewynckele.com",
  },
];

export type Tech = {
  name: string;
  icon?: string;
  iconClassName?: string;
};

export const langKinds = ["Frontend", "Backend"] as const;
export type LangKind = (typeof langKinds)[number];

export type Lang = Tech & { kind: LangKind[] };

export const programming: Lang[] = [
  { name: "Go", kind: ["Backend"], icon: "/icons/go.svg" },
  { name: "Node.js", kind: ["Frontend", "Backend"], icon: "/icons/nodejs.svg" },
  { name: "Python", kind: ["Backend"], icon: "/icons/python.svg" },
  { name: "gRPC", kind: ["Backend"], icon: "/icons/grpc.svg" },
  { name: "ConnectRPC", kind: ["Backend"], icon: "/icons/connectrpc.svg" },
  { name: "Kubebuilder", kind: ["Backend"], icon: "/icons/kubebuilder.svg" },
  {
    name: "TypeScript",
    kind: ["Frontend", "Backend"],
    icon: "/icons/typescript.svg",
  },
  { name: "React", kind: ["Frontend"], icon: "/icons/react.svg" },
  { name: "Next.js", kind: ["Frontend", "Backend"], icon: "/icons/nextjs.svg" },
  { name: "Tailwind", kind: ["Frontend"], icon: "/icons/tailwindcss.svg" },
  { name: "Git", kind: [], icon: "/icons/git.svg" },
];

export const devops: Tech[] = [
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
  { name: "Talos Linux", icon: "/icons/talos.svg" },
  { name: "Linux", icon: "/icons/linux.svg" },
  { name: "Helm", icon: "/icons/helm.svg" },
  { name: "Flux", icon: "/icons/flux.svg" },
  { name: "Istio", icon: "/icons/istio.svg" },
  { name: "Terraform", icon: "/icons/terraform.svg" },
  {
    name: "Ansible",
    icon: "/icons/ansible.svg",
    iconClassName: "dark:invert",
  },
  { name: "GitHub Actions", icon: "/icons/githubactions.svg" },
  { name: "GitLab", icon: "/icons/gitlab.svg" },
  {
    name: "Tailscale",
    icon: "/icons/tailscale.svg",
    iconClassName: "dark:invert",
  },
  { name: "Vault", icon: "/icons/vault.svg" },
  { name: "Cloudflare", icon: "/icons/cloudflare.svg" },
  { name: "Hetzner", icon: "/icons/hetzner.svg" },
];

export const observability: Tech[] = [
  { name: "Prometheus", icon: "/icons/prometheus.svg" },
  { name: "VictoriaMetrics", icon: "/icons/victoriametrics.svg" },
  { name: "Grafana", icon: "/icons/grafana.svg" },
  { name: "OpenTelemetry", icon: "/icons/opentelemetry.svg" },
  { name: "Loki", icon: "/icons/loki.svg" },
  { name: "Tempo", icon: "/icons/tempo.svg" },
  { name: "Alloy", icon: "/icons/alloy.svg" },
  {
    name: "VictoriaLogs",
    icon: "/icons/victorialogs.svg",
    iconClassName: "dark:invert",
  },
];

export const databases: Tech[] = [
  { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" },
  { name: "Redis", icon: "/icons/redis.svg" },
  { name: "S3", icon: "/icons/s3.svg" },
  { name: "Longhorn", icon: "/icons/longhorn.svg" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/ArnoldVanN" },
  { label: "LinkedIn", href: "https://linkedin.com/arno-van-nieuwenhuyzen" },
  { label: "Email", href: "mailto:arnovannieuwenhuyzen@outlook.com" },
] as const;
