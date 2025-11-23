import { useState, useEffect, useRef } from "react";
import { Typography } from "./typography";
import { cn } from "@/lib/utils";

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
    title: "Isame Load Balancer",
    description:
      "Production-ready HTTP/HTTPS load balancer in Go featuring multiple algorithms (Round-Robin, Weighted, Least Connections), circuit breaker pattern, automatic health checks, per-client rate limiting, and Prometheus metrics. Supports TLS 1.2/1.3 with configurable cipher suites and graceful shutdown.",
    tags: ["Go", "Distributed Systems", "TLS/HTTPS", "Prometheus", "YAML"],
    image: "/images/project-1-v1.webp",
    githubUrl: "https://github.com/sanchxt/isame-lb",
  },
  {
    title: "Taskflow",
    description:
      "A CLI/TUI-based task and project management application built in Go. Features include project management with aliases, custom views, task templates, fuzzy search, natural language queries, export/import functionality (JSON, CSV, Markdown), and theming support. Built with Bubble Tea for the TUI interface and SQLite for data persistence.",
    tags: ["Go", "CLI", "TUI", "SQLite", "Bubble Tea", "Cobra", "Viper"],
    image: "/images/project-2-v1.webp",
    githubUrl: "https://github.com/sanchxt/golang-task-management",
  },
  {
    title: "Warpscew",
    description:
      "An ASCII layout builder with smart grid lines, auto layouts, and artboards for different screen sizes. Supports copying or downloading layouts as .md or .txt files. Useful for quickly designing layouts and describing them in AI chats to communicate design intentions effectively.",
    tags: ["Astro", "React", "Zustand", "TypeScript", "Radix UI"],
    image: "/images/project-3-v1.webp",
    liveUrl: "https://warpscew.sanchxt.com",
    githubUrl: "https://github.com/sanchxt/ascii-layout-builder",
  },
];

export const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsImageLoaded(false);
    const timer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const scrollToProject = (index: number) => {
    projectRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      scrollToProject(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < PROJECTS.length - 1) {
      scrollToProject(activeIndex + 1);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      {/* heading */}
      <div className="mb-12">
        <h2 className="group relative inline-block text-left text-3xl md:text-4xl font-semibold text-text-heading cursor-pointer">
          projects
          <span className="absolute -bottom-1 left-0 h-1 w-20 bg-text-heading rounded-xs transition-all duration-300 ease-in-out group-hover:w-full" />
        </h2>
      </div>

      {/* main content */}
      <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* left side */}
        <div className="w-full lg:w-[55%] relative flex-shrink-0">
          {/* projects list */}
          <div className="space-y-8">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                className={cn(
                  "min-h-[60vh] flex items-center transition-all duration-300",
                  "border-l-2 pl-6 py-8",
                  activeIndex === index
                    ? "border-text-tertiary opacity-100"
                    : "border-border-subtle opacity-50 hover:opacity-75"
                )}
              >
                <div className="w-full">
                  {/* title */}
                  <Typography
                    variant="h3"
                    className="mb-4 text-2xl md:text-3xl lg:text-4xl transition-colors duration-200"
                  >
                    {project.title}
                  </Typography>

                  {/* description */}
                  <Typography
                    variant="p"
                    className="text-text-secondary leading-relaxed mb-6 mt-0"
                  >
                    {project.description}
                  </Typography>

                  {/* tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs md:text-sm font-medium text-text-secondary bg-section-bg-alt border border-border-subtle rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* links */}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-heading transition-colors duration-200 font-medium text-sm md:text-base hover:underline underline-offset-4"
                      >
                        View Live →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-heading transition-colors duration-200 font-medium text-sm md:text-base hover:underline underline-offset-4"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>

                  {/* mobile image */}
                  <div className="lg:hidden mt-8 w-full aspect-video bg-border-default rounded-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right side - sticky image (desktop) */}
        <div className="hidden lg:block w-full lg:w-[55%] flex-shrink-0 self-stretch">
          <div className="sticky top-44">
            <div className="w-full h-[480px] bg-border-default rounded-lg overflow-hidden shadow-lg">
              <img
                src={PROJECTS[activeIndex].image}
                alt={PROJECTS[activeIndex].title}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
              />
            </div>

            {/* project counter */}
            <div className="mt-4 text-center">
              <span className="text-sm text-text-tertiary font-medium">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
