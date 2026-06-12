export const Hero = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
      <h1 className="text-text-heading">
        <span
          className="font-cursive"
          style={{ fontSize: "clamp(2.75rem, 12vw, 8rem)" }}
        >
          Sanchit
        </span>
        <span
          className="block font-sans font-light"
          style={{ fontSize: "clamp(1.35rem, 4vw, 2.75rem)" }}
        >
          Software Engineer / UI UX Designer / Video Editor
        </span>
      </h1>

      <p className="mt-6 max-w-3xl text-base leading-7 text-text-secondary md:text-lg">
        I build useful web products, shape clean interfaces, and edit visual
        stories with the same bias for clarity, pacing, and small details.
      </p>
    </div>
  );
};
