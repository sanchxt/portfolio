import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type VideoEdit = {
  title: string;
  filename: string;
  duration: string;
  format: string;
  dimensions: string;
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
    tile: "md:col-span-3",
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

  const allSourcesConfigured = useMemo(
    () => videos.every((video) => Boolean(video.source)),
    [videos]
  );

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

      gsap.fromTo(
        "[data-reveal-word]",
        { opacity: 0.16, y: 12 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: "[data-reveal-copy]",
            start: "top 82%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  const revealCopy =
    "A short-form gallery built for rhythm, first frames, scroll pacing, and fast scanning without asking the browser to fetch every video upfront.";

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="mb-12 overflow-hidden border-y border-border-default py-5">
        <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-10 text-sm font-semibold uppercase tracking-[0.22em] text-text-tertiary">
          {Array.from({ length: 2 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-10">
              <span>cuts</span>
              <span>captions</span>
              <span>motion</span>
              <span>sound</span>
              <span>loops</span>
              <span>retention</span>
            </div>
          ))}
        </div>
      </div>

      <p
        data-reveal-copy
        className="mb-14 max-w-5xl text-2xl leading-tight text-text-heading md:text-4xl"
      >
        {revealCopy.split(" ").map((word, index) => (
          <span data-reveal-word key={`${word}-${index}`} className="inline-block">
            {word}
            {index < revealCopy.split(" ").length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </p>

      {!allSourcesConfigured && (
        <div className="mb-8 rounded-md border border-border-default bg-section-bg-alt px-4 py-3 text-sm text-text-secondary">
          Set PUBLIC_CDN_URL to enable CDN playback from videos-edits.
        </div>
      )}

      <div className="grid grid-flow-dense gap-4 md:grid-cols-6 md:gap-5">
        {videos.map((video) => {
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
              <div className="overflow-hidden rounded-md border border-border-subtle bg-section-bg-alt">
                <div
                  className={cn(
                    "relative w-full overflow-hidden bg-section-bg-alt",
                    styles.media
                  )}
                >
                  {canLoad ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full bg-section-bg-alt object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    >
                      <source src={video.source} type="video/webm" />
                    </video>
                  ) : (
                    <div className="flex h-full w-full flex-col justify-between p-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                          {styles.label}
                        </p>
                        <h3 className="mt-4 max-w-[15rem] text-2xl font-semibold leading-tight text-text-heading md:text-3xl">
                          {video.title}
                        </h3>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {video.source ? "Loading near viewport" : "CDN source pending"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-text-heading transition-colors duration-200 group-hover:text-text-accent">
                    {video.title}
                  </h4>
                  <p className="mt-1 text-sm text-text-secondary">
                    {video.dimensions}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                  <span className="rounded-md border border-border-subtle px-2.5 py-1 text-xs font-medium text-text-tertiary">
                    {video.duration}
                  </span>
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
