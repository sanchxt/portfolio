import { useEffect, useRef, useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import { Lightbox } from "@/components/system/Lightbox";
import { cn } from "@/lib/utils";
import { formatDuration, type VideoEdit } from "@/data/videos";
import waveforms from "@/data/waveforms.json";

type EditSuiteProps = {
  videos: VideoEdit[];
  children?: ReactNode;
};

const PREVIEW_SECONDS = 4;

const pad = (value: number) => String(Math.floor(value)).padStart(2, "0");

const toTimecode = (seconds: number) =>
  `00:${pad(seconds / 60)}:${pad(seconds % 60)}:${pad((seconds % 1) * 24)}`;

const Waveform = ({ slug }: { slug: string }) => {
  const bars = (waveforms as Record<string, number[]>)[slug] ?? [];
  return (
    <svg
      viewBox={`0 0 ${bars.length} 100`}
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      {bars.map((bar, index) => {
        const height = Math.max(bar * 92, 3);
        return (
          <rect
            key={index}
            x={index + 0.15}
            y={50 - height / 2}
            width={0.7}
            height={height}
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
};

/** Hero monitor and timeline, the edit grid, and the player share one selection. */
export const EditSuite = ({ videos, children }: EditSuiteProps) => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const [inView, setInView] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const monitorRef = useRef<HTMLVideoElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = videos.reduce((sum, video) => sum + video.duration, 0);
  const offsets = videos.map((_, index) =>
    videos.slice(0, index).reduce((sum, video) => sum + video.duration, 0),
  );
  const current = videos[active];

  const select = (index: number) => setActive((index + videos.length) % videos.length);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    setCanAnimate(!reduced && !saveData);

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Runs the playhead and timecode from the monitor clock, outside React renders.
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const progress = Math.min((monitorRef.current?.currentTime ?? 0) / PREVIEW_SECONDS, 1);
      const time = offsets[active] + progress * current.duration;
      if (playheadRef.current) playheadRef.current.style.left = `${(time / total) * 100}%`;
      if (timecodeRef.current) timecodeRef.current.textContent = toTimecode(time);
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    const monitor = monitorRef.current;
    if (!monitor) return;
    if (inView && playing === null) monitor.play().catch(() => {});
    else monitor.pause();
  }, [inView, playing, active, canAnimate]);

  // On phones the timeline scrolls sideways, so keep the active clip on screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    const left = (offsets[active] / total) * track.scrollWidth;
    track.scrollTo({ left: Math.max(left - 16, 0), behavior: "smooth" });
  }, [active]);

  return (
    <>
      <section ref={heroRef} className="flex min-h-svh flex-col pt-(--nav-height)">
        <div className="shell grid flex-1 items-center gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:py-6">
          <div className="min-w-0">{children}</div>

          <figure className="relative mx-auto w-[min(68vw,18rem)] lg:w-auto">
            <div className="film-frame">
            <div className="relative aspect-9/16 overflow-hidden bg-black lg:h-[min(62svh,40rem)]">
              <img
                src={current.poster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              {canAnimate && (
                <video
                  key={current.slug}
                  ref={monitorRef}
                  src={current.preview}
                  poster={current.poster}
                  muted
                  autoPlay
                  playsInline
                  onEnded={() => select(active + 1)}
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                onClick={() => setPlaying(active)}
                className="group absolute inset-0 flex items-center justify-center bg-linear-to-t from-black/70 via-transparent to-black/40"
                aria-label={`Watch ${current.title} with sound`}
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-stamp text-white transition-transform duration-150 group-hover:scale-110">
                  <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
                </span>
              </button>
              <div className="t-label pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 text-white">
                <span className="flex items-center gap-1.5">
                  <span className="animate-pulse-dot size-2 rounded-full bg-stamp" />
                  PROGRAM
                </span>
                <span>{current.format}</span>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-white">
                <p className="font-semibold">{current.title}</p>
                <p className="t-label mt-0.5 opacity-80">Watch with sound</p>
              </div>
            </div>
            </div>
          </figure>
        </div>

        <div className="screening">
          <div className="sprockets-x" aria-hidden="true" />
          <div className="t-label shell flex items-center justify-between py-2 text-faint">
            <span>
              <span ref={timecodeRef} className="tabular-nums text-accent">
                00:00:00:00
              </span>
              <span className="ml-3 hidden sm:inline">SNCHT SAFETY FILM 24A / timeline to scale</span>
            </span>
            <span className="tabular-nums">
              {videos.length} edits / {formatDuration(total)}
            </span>
          </div>

          <div ref={trackRef} className="scroll-thin overflow-x-auto">
            <div className="relative min-w-[56rem] lg:min-w-0">
              <div
                ref={playheadRef}
                className="pointer-events-none absolute inset-y-0 z-10 w-px bg-accent"
                style={{ left: 0 }}
                aria-hidden="true"
              >
                <span className="absolute -left-1 top-0 size-2 rotate-45 bg-accent" />
              </div>

              <ul className="flex" aria-label="Edits on the timeline">
                {videos.map((video, index) => (
                  <li
                    key={video.slug}
                    style={{ flexGrow: video.duration, flexBasis: 0 }}
                    className="min-w-0 border-r border-bg"
                  >
                    <button
                      type="button"
                      onClick={() => select(index)}
                      onMouseEnter={() => select(index)}
                      onFocus={() => select(index)}
                      aria-pressed={index === active}
                      aria-label={`Preview ${video.title}, ${formatDuration(video.duration)}`}
                      className="block w-full text-left"
                    >
                      <span
                        className={cn(
                          "relative block h-14 overflow-hidden bg-repeat-x transition-[filter] duration-150 md:h-20",
                          index === active ? "brightness-100" : "brightness-50 hover:brightness-90",
                        )}
                        style={{
                          backgroundImage: `url(${video.poster})`,
                          backgroundSize: "auto 100%",
                        }}
                      >
                        <span className="t-label absolute left-0 top-0 max-w-full truncate bg-black/70 px-1.5 py-0.5 text-white">
                          {video.category}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "block h-8 border-t border-bg px-px md:h-10",
                          index === active ? "text-accent" : "text-faint",
                        )}
                      >
                        <Waveform slug={video.slug} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sprockets-x" aria-hidden="true" />
        </div>
      </section>

      <div className="screening">
      <section id="work" className="section shell">
        <header className="mb-12 grid gap-6 border-t border-line pt-5 md:mb-20 lg:grid-cols-12">
          <p className="t-label text-faint lg:col-span-3">
            Selected work / {videos.length} edits
          </p>
          <div className="lg:col-span-9">
            <h2 className="t-display t-lg max-w-[18ch]">A range of pacing, formats, and energy.</h2>
            <p className="t-lede mt-6 max-w-2xl">
              Travel reels, sports moments, talking-head stories, and song edits. Press any edit to
              watch it with sound.
            </p>
          </div>
        </header>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5 md:gap-y-12">
          {videos.map((video, index) => (
            <li key={video.slug} className="md:even:mt-16">
              <EditTile video={video} index={index} onPlay={() => setPlaying(index)} />
            </li>
          ))}
        </ul>
      </section>
      <div className="sprockets-x" aria-hidden="true" />
      </div>

      <Lightbox
        className="screening"
        open={playing !== null}
        title={videos[playing ?? 0].title}
        meta={`${videos[playing ?? 0].category} / ${videos[playing ?? 0].format} / ${formatDuration(videos[playing ?? 0].duration)}`}
        position={`${String((playing ?? 0) + 1).padStart(2, "0")} / ${String(videos.length).padStart(2, "0")}`}
        onClose={() => setPlaying(null)}
        onPrevious={() => setPlaying(((playing ?? 0) - 1 + videos.length) % videos.length)}
        onNext={() => setPlaying(((playing ?? 0) + 1) % videos.length)}
      >
        {playing !== null && (
          <video
            key={videos[playing].slug}
            poster={videos[playing].poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full bg-black object-contain"
          >
            {videos[playing].sources.map((source) => (
              <source key={source} src={source} />
            ))}
          </video>
        )}
      </Lightbox>
    </>
  );
};

const EditTile = ({
  video,
  index,
  onPlay,
}: {
  video: VideoEdit;
  index: number;
  onPlay: () => void;
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <button
      type="button"
      onClick={onPlay}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovering(true);
      }}
      onPointerLeave={() => setHovering(false)}
      aria-label={`Watch ${video.title}, ${formatDuration(video.duration)}`}
      className="group block w-full text-left"
    >
      <span className="relative block aspect-9/16 overflow-hidden rounded-room border border-line bg-surface transition-colors duration-150 group-hover:border-accent">
        <img
          src={video.poster}
          alt=""
          loading="lazy"
          decoding="async"
          width={720}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {hovering && (
          <video
            src={video.preview}
            muted
            loop
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        )}
        <span className="t-label absolute left-2 top-2 rounded-sm bg-black/70 px-1.5 py-0.5 tabular-nums text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="t-label absolute bottom-2 right-2 rounded-sm bg-black/70 px-1.5 py-0.5 tabular-nums text-white">
          {formatDuration(video.duration)}
        </span>
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-on-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
        </span>
      </span>
      <span className="mt-3 block font-semibold leading-snug md:text-lg">{video.title}</span>
      <span className="t-label mt-1 block text-faint">{video.category}</span>
    </button>
  );
};
