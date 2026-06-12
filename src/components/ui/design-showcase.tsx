import { Typography } from "./typography";

const CREATIVE_TRACKS = [
  {
    title: "UI/UX design",
    href: "/designs",
    description:
      "Product interfaces, app flows, landing pages, dashboards, and visual systems shaped around usability and clean hierarchy.",
    details: ["Wireframes", "Product flows", "Design systems", "Visual polish"],
    linkLabel: "Explore design work",
  },
  {
    title: "Video editing",
    href: "/videos",
    description:
      "Short-form edits, product visuals, motion-led cuts, pacing, sound, color, and social-first story structure.",
    details: [
      "Short-form edits",
      "Product videos",
      "Motion rhythm",
      "Color and sound",
    ],
    linkLabel: "Explore video edits",
  },
];

export const DesignShowcase = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h2 className="group relative inline-block text-left text-3xl md:text-4xl font-semibold text-text-heading cursor-pointer">
          creative practice
          <span className="absolute -bottom-1 left-0 h-1 w-20 bg-text-heading rounded-xs transition-all duration-300 ease-in-out group-hover:w-full" />
        </h2>

        <Typography
          variant="p"
          className="mt-0 max-w-xl text-text-secondary leading-relaxed md:text-right"
        >
          I do not treat design, code, and video as separate lanes. They inform
          each other: interface clarity, visual pacing, and a sharper sense of
          what the final experience should feel like.
        </Typography>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {CREATIVE_TRACKS.map((track) => (
          <article
            key={track.title}
            className="group border-t border-border-default py-8 md:py-10"
          >
            <Typography
              variant="h3"
              className="mb-4 text-2xl md:text-3xl transition-colors duration-200 group-hover:text-text-accent"
            >
              {track.title}
            </Typography>

            <Typography
              variant="p"
              className="mt-0 text-text-secondary leading-relaxed"
            >
              {track.description}
            </Typography>

            <div className="mt-6 flex flex-wrap gap-2">
              {track.details.map((detail) => (
                <span
                  key={detail}
                  className="rounded-md border border-border-subtle px-2.5 py-1 text-xs font-medium text-text-tertiary"
                >
                  {detail}
                </span>
              ))}
            </div>

            <a
              href={track.href}
              className="mt-7 inline-block text-base font-medium text-text-secondary transition-colors duration-200 hover:text-text-heading hover:underline hover:decoration-2 underline-offset-4 md:text-lg"
            >
              {track.linkLabel} -&gt;
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};
