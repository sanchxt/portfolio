const CDN_URL = (
  import.meta.env.PUBLIC_CDN_URL || "https://cdn.sanchxt.com"
).replace(/^http:\/\//i, "https://");

const getImageUrl = (filename: string) =>
  CDN_URL ? `${CDN_URL}/${filename}` : "";

const DESIGNS = Array.from({ length: 11 }, (_, index) => ({
  id: index + 1,
  image: getImageUrl(`design-${index + 1}.webp`),
}));

export const DesignGallery = () => {
  return (
    <div className="relative w-full" aria-label="Selected design gallery">
      <div className="mb-5 flex items-center justify-between gap-5 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
        <span>11 selected visuals</span>
        <span className="hidden items-center gap-2 sm:inline-flex">
          <span aria-hidden="true">←</span>
          Scroll to explore
          <span aria-hidden="true">→</span>
        </span>
      </div>

      <div className="-mx-4 overflow-x-auto pb-5 [scrollbar-color:var(--border-default)_transparent] [scrollbar-width:thin]">
        <div className="flex w-max snap-x snap-mandatory gap-4 px-4 md:gap-6">
          {DESIGNS.map((design) => (
            <article
              key={design.id}
              className="w-[86vw] max-w-[54rem] shrink-0 snap-center md:w-[72vw] lg:w-[62vw]"
            >
              <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                <span>{String(design.id).padStart(2, "0")}</span>
                <span>{String(design.id).padStart(2, "0")} / 11</span>
              </div>

              <div className="aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-border-default bg-section-bg-alt shadow-[0_18px_60px_rgba(0,0,0,0.07)]">
                {design.image ? (
                  <img
                    src={design.image}
                    alt={`Selected interface design ${String(design.id).padStart(2, "0")}`}
                    loading={design.id <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.015]"
                  />
                ) : (
                  <div className="h-full w-full bg-section-bg-alt" />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
