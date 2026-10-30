import { useState } from "react";
import { Lightbox } from "@/components/system/Lightbox";
import { cn } from "@/lib/utils";
import type { DesignImage, DesignProject } from "@/data/designs";

type DesignWallProps = {
  projects: DesignProject[];
};

type Piece = DesignImage & { type: string };

export const DesignWall = ({ projects }: DesignWallProps) => {
  const pieces: Piece[] = projects.flatMap((project) =>
    project.images.map((image) => ({ ...image, type: project.type })),
  );
  const [open, setOpen] = useState<number | null>(null);
  const current = pieces[open ?? 0];

  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
        {projects.map((project, projectIndex) => (
          <article key={project.type}>
            <header className="mb-5 flex items-baseline gap-4 md:mb-7">
              <span className="t-label text-accent">
                {String(projectIndex + 1).padStart(2, "0")}
              </span>
              <h3 className="t-display t-md">{project.type}</h3>
            </header>

            <div className="grid gap-x-5 gap-y-10 lg:grid-cols-12">
              {project.images.map((image) => {
                const index = pieces.findIndex((piece) => piece.src === image.src);
                return (
                  <figure key={image.src} className={cn("min-w-0", image.span)}>
                    <figcaption className="t-label mb-2 text-faint">{image.piece}</figcaption>
                    <button
                      type="button"
                      className="frame"
                      onClick={() => setOpen(index)}
                      aria-label={`Open ${image.piece}, ${project.type}, full size`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-auto w-full bg-surface"
                      />
                      <span className="frame-size t-label tabular-nums">
                        {image.width} x {image.height}
                      </span>
                    </button>
                  </figure>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <Lightbox
        open={open !== null}
        title={current.piece}
        meta={current.type}
        position={`${String((open ?? 0) + 1).padStart(2, "0")} / ${String(pieces.length).padStart(2, "0")}`}
        onClose={() => setOpen(null)}
        onPrevious={() => setOpen(((open ?? 0) - 1 + pieces.length) % pieces.length)}
        onNext={() => setOpen(((open ?? 0) + 1) % pieces.length)}
      >
        <div className="canvas-dots scroll-thin flex h-full items-center justify-center overflow-auto p-3 md:p-8">
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="max-h-full w-auto max-w-full object-contain"
          />
        </div>
      </Lightbox>
    </>
  );
};
