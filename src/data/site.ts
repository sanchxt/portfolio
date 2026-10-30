export type Room = "engineering" | "design" | "video";

export const EMAIL = "sanchxt.dev@gmail.com";

const CDN_URL = (
  import.meta.env.PUBLIC_CDN_URL || "https://cdn.sanchxt.com"
).replace(/^http:\/\//i, "https://");

export const cdn = (path: string) => `${CDN_URL}/${path}`;

export const mailto = (subject: string, body?: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/sanchxt" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sanchit-bhalla" },
  { label: "Twitter / X", href: "https://twitter.com/sanchitcodes" },
  { label: "Instagram", href: "https://instagram.com/sanch.xt" },
  { label: "dev.to", href: "https://dev.to/sanchxt" },
];

export const ROOMS: Record<
  Room,
  {
    label: string;
    href: string;
    otherLabel: string;
    nav: { href: string; label: string }[];
    cta: { href: string; label: string };
  }
> = {
  engineering: {
    label: "ai engineering",
    href: "/",
    otherLabel: "AI engineering",
    nav: [
      { href: "#ai", label: "What I build" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#stack", label: "Stack" },
    ],
    cta: { href: "#contact", label: "Get in touch" },
  },
  design: {
    label: "design",
    href: "/designs",
    otherLabel: "UI/UX design",
    nav: [
      { href: "#work", label: "Work" },
      { href: "#services", label: "Services" },
      { href: "#process", label: "Process" },
    ],
    cta: { href: "#contact", label: "Start a project" },
  },
  video: {
    label: "video",
    href: "/videos",
    otherLabel: "Video editing",
    nav: [
      { href: "#work", label: "Edits" },
      { href: "#services", label: "Services" },
      { href: "#process", label: "Process" },
    ],
    cta: { href: "#contact", label: "Start an edit" },
  },
};
