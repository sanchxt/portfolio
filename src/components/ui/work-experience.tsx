import { Typography } from "./typography";

const WORK_EXPERIENCES = [
  {
    company: "Fullstack Developer - Ebslon Infotech",
    period: "Jan. 2025 - Present",
    description:
      "Developed ERP systems using MERN and PERN stacks. Managed DevOps, CI/CD pipelines (Jenkins, GitHub Actions), and VPS infrastructure (Hetzner, Contabo). Implemented real-time features with WebSockets, state management (Zustand, Redux, TanStack), and Redis caching.",
  },
  {
    company: "Frontend Intern - Bestor",
    period: "Nov. 2021 - Jan. 2022",
    description:
      "Designed and improved UI/UX of websites in Shopify. Collaborated with developers and SEO team to enhance user experience and site performance.",
  },
];

export const WorkExperience = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      {/* heading - right aligned */}
      <div className="mb-12 flex justify-end">
        <h2 className="group relative inline-block text-right text-3xl md:text-4xl font-semibold text-text-heading cursor-pointer">
          work experience
          <span className="absolute -bottom-1 right-0 h-1 w-20 bg-text-heading rounded-xs transition-all duration-300 ease-in-out group-hover:w-full" />
        </h2>
      </div>

      {/* content - left aligned */}
      <div className="space-y-12 md:space-y-16 lg:w-[70%]">
        {WORK_EXPERIENCES.map((experience, index) => (
          <div key={index} className="flex gap-4 md:gap-6 items-start group">
            {/* letter marker */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <span className="text-text-secondary font-medium text-sm md:text-base group-hover:text-text-heading transition-colors duration-200">
                ({String.fromCharCode(97 + index)})
              </span>
            </div>

            {/* content */}
            <div className="flex-1 pt-0.5">
              {/* company name and date */}
              <div className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                <Typography
                  variant="h4"
                  className="text-xl md:text-2xl group-hover:text-text-accent transition-colors duration-200"
                >
                  {experience.company}
                </Typography>

                <span className="text-sm md:text-base text-text-tertiary font-medium md:flex-shrink-0">
                  {experience.period}
                </span>
              </div>

              <Typography
                variant="p"
                className="text-text-secondary leading-relaxed mt-0"
              >
                {experience.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
