import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type VideoEdit = {
  title: string;
  filename: string;
  duration?: string;
  format: string;
  dimensions?: string;
  category: string;
  orientation: "vertical" | "landscape" | "square";
  source: string;
};

type VideoEditsGalleryProps = {
  videos: VideoEdit[];
};

const ORIENTATION_STYLES: Record<
  VideoEdit["orientation"],
  { tile: string; media: string; label: string }
> = {
  vertical: {
    tile: "md:col-span-2",
    media: "aspect-[9/16]",
    label: "short-form vertical",
  },
  landscape: {
    tile: "md:col-span-4",
    media: "aspect-video",
    label: "wide edit",
  },
  square: {
    tile: "md:col-span-3",
    media: "aspect-square",
    label: "square loop",
  },
};

const getLoadedKey = (video: VideoEdit) => video.filename;

export const VideoEditsGallery = ({ videos }: VideoEditsGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-video-key]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleKeys = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.getAttribute("data-video-key"))
          .filter((key): key is string => Boolean(key));

        if (visibleKeys.length === 0) return;

        setLoadedVideos((current) => {
          const next = new Set(current);
          visibleKeys.forEach((key) => next.add(key));
          return next;
        });
      },
      {
        rootMargin: "420px 0px",
        threshold: 0.01,
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [videos]);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray<HTMLElement>("[data-video-card]");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0.2, scale: 0.92, y: 56 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "bottom 24%",
              scrub: 0.6,
            },
          }
        );
      });

    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="grid gap-x-5 gap-y-14 md:grid-cols-6 md:gap-y-20">
        {videos.map((video, index) => {
          const styles = ORIENTATION_STYLES[video.orientation];
          const loaded = loadedVideos.has(getLoadedKey(video));
          const canLoad = loaded && Boolean(video.source);

          return (
            <article
              key={video.filename}
              data-video-card
              data-video-key={getLoadedKey(video)}
              className={cn("group min-w-0", styles.tile)}
            >
              <div className="mb-3 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{video.category}</span>
              </div>

              <div className="overflow-hidden rounded-[1.25rem] border border-border-default bg-section-bg-alt shadow-[0_18px_60px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <div
                  className={cn(
                    "relative w-full overflow-hidden bg-section-bg-alt",
                    styles.media
                  )}
                >
                  {canLoad ? (
                    <video
                      src={video.source}
                      controls
                      playsInline
                      preload="metadata"
                      className="portfolio-video h-full w-full bg-section-bg-alt object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col justify-between p-6 md:p-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                          {styles.label}
                        </p>
                        <h3 className="mt-5 max-w-[16rem] text-3xl font-semibold leading-[0.95] tracking-[-0.03em] text-text-heading md:text-4xl">
                          {video.title}
                        </h3>
                      </div>
                      <span className="text-5xl font-semibold tracking-[-0.05em] text-border-default md:text-7xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-2xl font-semibold tracking-[-0.02em] text-text-heading transition-colors duration-200 group-hover:text-text-accent">
                    {video.title}
                  </h4>
                  {video.dimensions && (
                    <p className="mt-1 text-sm text-text-secondary">
                      {video.dimensions}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                  {video.duration && (
                    <span className="rounded-md border border-border-subtle px-2.5 py-1 text-xs font-medium text-text-tertiary">
                      {video.duration}
                    </span>
                  )}
                  <span className="rounded-md border border-border-subtle px-2.5 py-1 text-xs font-medium text-text-tertiary">
                    {video.format}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
