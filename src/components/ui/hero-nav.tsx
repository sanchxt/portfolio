import "./hero-nav.css";
import { NAV_LINKS } from "@/constants/nav-links";

export const HeroNav = () => {
  return (
    <nav className="grid grid-cols-2 sm:flex gap-8 md:gap-12">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="nav-link font-sans text-text-secondary font-medium"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};
