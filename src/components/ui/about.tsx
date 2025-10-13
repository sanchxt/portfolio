import { Typography } from "./typography";

const SOCIAL_LINKS = [
  { label: "github", href: "https://github.com/sanchxt" },
  { label: "instagram", href: "https://instagram.com/sanch.xt" },
  { label: "twitter / x", href: "https://twitter.com/sanchxtdev" },
  { label: "e-mail", href: "mailto:sanchxt.dev@gmail.com" },
];

export const About = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      {/* heading */}
      <div className="mb-12">
        <h2 className="group relative inline-block text-left text-3xl md:text-4xl font-semibold text-text-heading cursor-pointer">
          about me
          <span className="absolute -bottom-1 left-0 h-1 w-20 bg-text-heading rounded-xs transition-all duration-300 ease-in-out group-hover:w-full" />
        </h2>
      </div>

      {/* content */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-border-default overflow-hidden">
            <img
              src="/placeholder-avatar.jpg"
              alt="Sanchit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* text content */}
        <div className="flex-1">
          <Typography variant="h3" className="mb-4 text-2xl md:text-3xl">
            Sanchit Bhalla
          </Typography>

          <Typography
            variant="p"
            className="text-text-secondary leading-relaxed mb-6 mt-0 lg:w-[70%]"
          >
            A passionate software developer with expertise in building modern
            web applications. I love creating elegant solutions to complex
            problems and constantly learning new technologies to stay at the
            forefront of development.
          </Typography>

          {/* socials */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-text-secondary hover:text-text-heading transition-colors duration-200 font-medium text-sm md:text-base hover:underline underline-offset-4 hover:decoration-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
