import { ArrowUpRight, Github } from "lucide-react";
import { Typography } from "./typography";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Note Me Please",
    description:
      "A calm AI notes organizer for solo creators. It helps capture rough ideas, organize scattered notes, and turn them into tasks, drafts, shareable pages, and searchable workspaces.",
    tags: ["AI Notes", "Creator Workflow", "Tasks", "Drafts", "Sharing"],
    image: "/images/project-notemeplease-v1.webp",
    liveUrl: "https://notemeplease.com",
  },
  {
    title: "MyContent",
    description:
      "An AI-powered creative engine for product visuals, videos, and captions. It is built around generating branded creative assets quickly for content and product marketing workflows.",
    tags: [
      "Creative Engine",
      "Product Visuals",
      "Video Ideas",
      "Captions",
      "Brand Assets",
    ],
    image: "/images/project-mycontent-v2.webp",
    liveUrl: "https://mycontent.supply",
  },
  {
    title: "Yoop",
    description:
      "A CLI for fast local network file transfers and clipboard sharing. It uses simple 4-character codes, secure direct transfers, resumable sharing, and an optional browser UI without cloud uploads or accounts.",
    tags: [
      "File Transfer",
      "CLI Tool",
      "Local Network",
      "Secure Sharing",
      "Clipboard Sync",
    ],
    image: "/images/project-yoop-v1.webp",
    liveUrl: "https://yoop.sanchxt.com",
    githubUrl: "https://github.com/sanchxt/yoop",
  },
];

export const Projects = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="group relative inline-block text-left text-3xl md:text-4xl font-semibold text-text-heading cursor-pointer">
            projects
            <span className="absolute -bottom-1 left-0 h-1 w-20 bg-text-heading rounded-xs transition-all duration-300 ease-in-out group-hover:w-full" />
          </h2>
        </div>

        <Typography
          variant="p"
          className="mt-0 max-w-xl text-text-secondary leading-relaxed md:text-right"
        >
          A small set of shipped tools focused on systems, developer workflows,
          and clean interaction design.
        </Typography>
      </div>

      <div className="border-t border-border-default">
        {PROJECTS.map((project, index) => (
          <article
            key={project.title}
            className="group grid gap-6 border-b border-border-default py-8 md:grid-cols-[4rem_minmax(0,1fr)] lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-8"
          >
            <div className="text-sm font-medium text-text-tertiary">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div>
              <Typography
                variant="h3"
                className="mb-4 text-2xl md:text-3xl transition-colors duration-200 group-hover:text-text-accent"
              >
                {project.title}
              </Typography>

              <Typography
                variant="p"
                className="mt-0 text-text-secondary leading-relaxed"
              >
                {project.description}
              </Typography>

              <div
                className="mt-6 flex flex-wrap gap-2"
                aria-label={`Project areas: ${project.tags.join(", ")}`}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    aria-hidden="true"
                    className="rounded-md border border-border-subtle px-2.5 py-1 text-xs font-medium text-text-tertiary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-heading hover:underline underline-offset-4"
                  >
                    View live
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-heading hover:underline underline-offset-4"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <a
              href={project.liveUrl ?? project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="block overflow-hidden rounded-md border border-border-subtle bg-section-bg-alt"
            >
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                className="aspect-video h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};
