import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

const Navbar = ({ className, ...props }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
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

          {/* theme toggle */}
          <div className="flex flex-1 justify-end items-center">
            <button
              onClick={toggleTheme}
              className="inline text-xs sm:text-sm md:text-base lg:text-lg font-sans text-text-primary hover:text-text-accent transition-colors cursor-pointer"
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? "light" : "dark"} mode.
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.displayName = "Navbar";

export { Navbar };
