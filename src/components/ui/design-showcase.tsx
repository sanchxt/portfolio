import { Typography } from "./typography";

export const DesignShowcase = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      {/* heading */}
      <div className="mb-12 flex justify-end">
        <h2 className="group relative inline-block text-right text-3xl md:text-4xl font-semibold text-text-heading cursor-pointer">
          my designs
          <span className="absolute -bottom-1 right-0 h-1 w-20 bg-text-heading rounded-xs transition-all duration-300 ease-in-out group-hover:w-full" />
        </h2>
      </div>

      {/* content */}
      <div className="lg:w-[70%]">
        <Typography
          variant="p"
          className="text-text-secondary leading-relaxed mb-6 mt-0"
        >
          Beyond development, I also craft thoughtful designs. From user
          interfaces to visual concepts, I enjoy creating experiences that are
          both functional and aesthetically pleasing.
        </Typography>

        <a
          href="/designs"
          className="inline-block text-text-secondary hover:text-text-heading transition-colors duration-200 font-medium text-base md:text-lg hover:underline underline-offset-4 hover:decoration-2"
        >
          Explore my designs →
        </a>
      </div>
    </section>
  );
};
