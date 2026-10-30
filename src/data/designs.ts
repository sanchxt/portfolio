import { cdn } from "./site";

export type DesignImage = {
  src: string;
  width: number;
  height: number;
  piece: string;
  alt: string;
  /** Grid placement at the lg breakpoint. */
  span: string;
};

export type DesignProject = {
  type: string;
  images: DesignImage[];
};

const image = (
  number: number,
  width: number,
  height: number,
  piece: string,
  alt: string,
  span: string,
): DesignImage => ({ src: cdn(`design-${number}.webp`), width, height, piece, alt, span });

export const DESIGN_PROJECTS: DesignProject[] = [
  {
    type: "Video production agency",
    images: [
      image(
        1,
        1662,
        1080,
        "Landing page",
        "Landing page with a heavy condensed wordmark, mixed serif and sans headline, and a large black and white photo of a film set.",
        "lg:col-span-10",
      ),
    ],
  },
  {
    type: "Environmental search engine",
    images: [
      image(
        3,
        1662,
        1080,
        "Landing page",
        "Landing page on a grainy green and blue gradient, with halftone photo cards, a glass search bar, and impact counters.",
        "lg:col-span-8",
      ),
      image(
        2,
        1728,
        1080,
        "Colour direction",
        "Colour study of four nested grainy circles running from pale mint to deep green and teal blue, each labelled with its hex value.",
        "lg:col-span-4",
      ),
    ],
  },
  {
    type: "Cloud gaming platform",
    images: [
      image(
        4,
        1662,
        1080,
        "Pricing page",
        "Dark pricing page with pixel type, a monthly and annual toggle, and three halftone-textured plan cards.",
        "lg:col-span-10 lg:col-start-3",
      ),
    ],
  },
  {
    type: "Developer portfolio",
    images: [
      image(
        7,
        1784,
        842,
        "Bento hero",
        "Neo-brutalist bento layout with oversized expanded type, a map tile, a local time tile, and social links on periwinkle.",
        "lg:col-span-6",
      ),
      image(
        8,
        1784,
        918,
        "Bento sections",
        "Neo-brutalist tiles in lime, orange, and cyan for a marquee, toolbox, now playing, a project card, and a contact form.",
        "lg:col-span-6",
      ),
    ],
  },
  {
    type: "Command-line tool",
    images: [
      image(
        9,
        1902,
        966,
        "Marketing site hero",
        "Off-white hero with a heavy uppercase headline, lime accents, an install command with package manager tabs, and hard-shadow buttons.",
        "lg:col-span-12",
      ),
      image(
        10,
        1902,
        966,
        "How it works",
        "Three numbered steps with terminal windows above a diagram linking a sender and receiver through a short code.",
        "lg:col-span-6",
      ),
      image(
        11,
        1902,
        942,
        "Features",
        "Eight feature cards in a grid, each with a lime icon tile and a hard black shadow.",
        "lg:col-span-6",
      ),
    ],
  },
  {
    type: "Integration platform",
    images: [
      image(
        5,
        1155,
        802,
        "Feature section",
        "Soft white section with a serif italic headline and three cards holding fine-line geometric illustrations.",
        "lg:col-span-7",
      ),
    ],
  },
  {
    type: "Creative agency",
    images: [
      image(
        6,
        1591,
        791,
        "Site footer",
        "Dark footer with a large sans and italic call to action, newsletter field, site links, and a live local clock.",
        "lg:col-span-9 lg:col-start-4",
      ),
    ],
  },
];
