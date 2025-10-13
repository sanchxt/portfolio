import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

const Navbar = ({ className, ...props }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 bg-nav-bg backdrop-blur-sm border-b border-nav-border",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* collaboration text */}
            <div className="flex-1 flex items-start text-xs xl:text-sm font-sans text-nav-text space-x-1.5 lg:space-x-2">
              <span className="text-4xl">❊</span>
              <span className="max-w-[14rem]">
                open for any collaborations, offers, or just a chat
              </span>
            </div>

            {/* sncht */}
            <div className="hidden sm:flex flex-1 justify-center">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black font-sans font-display text-text-heading">
                sncht.
              </span>
            </div>

            {/* theme toggle on >= sm, hamburger on < sm */}
            <div className="flex flex-1 justify-end items-center">
              <button
                onClick={toggleTheme}
                className="hidden sm:inline text-xs sm:text-sm md:text-base lg:text-lg font-sans text-text-primary hover:text-text-accent transition-colors cursor-pointer"
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                {theme === "dark" ? "light" : "dark"} mode.
              </button>
              <button
                onClick={toggleMenu}
                className="sm:hidden p-2 hover:bg-accent rounded-md transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* overlay menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-page-bg flex items-center justify-center"
          onClick={toggleMenu}
        >
          {/* close button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-4 hover:bg-accent rounded-md transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* menu content */}
          <div className="text-center">
            <p className="text-2xl font-sans">Menu content goes here</p>
          </div>
        </div>
      )}
    </>
  );
};

Navbar.displayName = "Navbar";

export { Navbar };
