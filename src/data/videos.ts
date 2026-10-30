import { cdn } from "./site";

export type VideoEdit = {
  slug: string;
  title: string;
  category: string;
  /** Seconds, measured from the source file. */
  duration: number;
  format: string;
  poster: string;
  preview: string;
  /** Compressed file first, original as the fallback until it is uploaded. */
  sources: string[];
};

const edit = (
  slug: string,
  title: string,
  category: string,
  duration: number,
  original: string,
): VideoEdit => ({
  slug,
  title,
  category,
  duration,
  format: "9:16",
  poster: `/videos/posters/${slug}.webp`,
  preview: `/videos/previews/${slug}.mp4`,
  sources: [cdn(`videos-edits/videos-web/${slug}.mp4`), cdn(`videos-edits/${original}`)],
});

export const VIDEO_EDITS: VideoEdit[] = [
  edit("spiderman-song-edit", "Spider-Man song edit", "Song edit", 52.64, "spiderman-song-edit.mp4"),
  edit("travel", "Travel vlog", "Travel", 14.07, "travel-vertical.mp4"),
  edit("anime-edit", "Anime edit", "Anime", 16, "anime-edit.mp4"),
  edit("song-edit", "Rhea Seehorn song edit", "Song edit", 25.19, "song-edit.mp4"),
  edit("sports-edit", "Sports edit", "Sports", 39.79, "messi-vertical.mp4"),
  edit("storytelling-edit", "Storytelling edit", "Storytelling", 50.78, "katie-vertical.mp4"),
  edit("time-motion-edit", "Time motion edit", "Motion edit", 22.09, "time.webm"),
  edit("talking-reel-edit", "Talking reel edit", "Talking head", 53.81, "talking-2.webm"),
];

export const TOTAL_RUNTIME = VIDEO_EDITS.reduce((sum, video) => sum + video.duration, 0);

export const formatDuration = (seconds: number) => {
  const whole = Math.round(seconds);
  return `${String(Math.floor(whole / 60)).padStart(2, "0")}:${String(whole % 60).padStart(2, "0")}`;
};
