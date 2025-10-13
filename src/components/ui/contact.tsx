import { Typography } from "./typography";

const SOCIAL_LINKS = [
  {
    name: "github",
    url: "https://github.com/sanchxt",
  },
  {
    name: "instagram",
    url: "https://instagram.com/sanch.xt",
  },
  {
    name: "twitter",
    url: "https://twitter.com/sanchxtdev",
  },
  {
    name: "dev.to",
    url: "https://dev.to/sanchxt",
  },
  {
    name: "linkedin",
    url: "https://linkedin.com/in/sanchit-bhalla",
  },
  {
    name: "email",
    url: "mailto:sanchxt.dev@gmail.com",
  },
];

export const Contact = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      {/* Heading - center aligned */}
      <div className="mb-16 flex justify-center">
        <h2 className="group relative inline-block text-center text-3xl md:text-4xl font-semibold text-text-heading cursor-pointer">
          contact me
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-20 bg-text-heading rounded-xs transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 group-hover:translate-x-0" />
        </h2>
      </div>

      {/* Social links grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-10">
          {SOCIAL_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center"
            >
              <Typography
                variant="p"
                className="text-lg md:text-xl text-text-secondary group-hover:text-text-heading transition-colors duration-200 mt-0"
              >
                {link.name}
              </Typography>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
