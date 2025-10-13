export const Footer = () => {
  return (
    <footer className="w-full border-t border-border-subtle bg-page-bg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - sncht. */}
          <div className="text-sm md:text-base font-medium font-sans text-text-primary">
            sncht.
          </div>

          {/* Right side - newsletter */}
          <a
            href="https://newsletter.sanchxt.com"
            target="_blank"
            className="text-sm md:text-base font-semibold font-sans text-text-primary hover:text-text-heading transition-colors duration-200 hover:underline underline-offset-4"
          >
            check out my newsletter
          </a>
        </div>
      </div>
    </footer>
  );
};
