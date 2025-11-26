import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { GalleryCanvas } from "./gallery-canvas";
import { GalleryImageWithFallback } from "./gallery-image";
import { useGalleryScroll } from "./use-gallery-scroll";

interface DesignItem {
  id: number;
  title: string;
  category: string;
  color: string;
  image: string;
}

// Design items - add your images to public/images/designs/
const DESIGNS: DesignItem[] = [
  { id: 1, title: "Dashboard Concept", category: "UI/UX", color: "#3b4252", image: "/images/designs/design-1.webp" },
  { id: 2, title: "Mobile Banking", category: "App Design", color: "#434c5e", image: "/images/designs/design-2.webp" },
  { id: 3, title: "E-commerce Flow", category: "Web Design", color: "#4c566a", image: "/images/designs/design-3.webp" },
  { id: 4, title: "Brand Identity", category: "Branding", color: "#2e3440", image: "/images/designs/design-4.webp" },
  { id: 5, title: "Data Dashboard", category: "Dashboard", color: "#5e81ac", image: "/images/designs/design-5.webp" },
  { id: 6, title: "Landing Page", category: "Marketing", color: "#81a1c1", image: "/images/designs/design-6.webp" },
  { id: 7, title: "Social App", category: "Mobile", color: "#88c0d0", image: "/images/designs/design-7.webp" },
  { id: 8, title: "Portfolio Site", category: "Web Design", color: "#8fbcbb", image: "/images/designs/design-8.webp" },
];

interface GallerySceneProps {
  scrollPosition: number;
  scrollVelocity: number;
  mousePosition: { x: number; y: number };
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

const GalleryScene = ({
  scrollPosition,
  scrollVelocity,
  mousePosition,
}: GallerySceneProps) => {
  const { viewport } = useThree();

  const itemWidth = Math.min(viewport.width * 0.35, 3.5);
  const itemHeight = itemWidth * 1.2;
  const gap = itemWidth * 0.4;
  const totalWidth = DESIGNS.length * (itemWidth + gap);

  const items = useMemo(() => {
    return DESIGNS.map((design, index) => {
      const depthLayer = index % 3;
      const zOffset = depthLayer * 0.5 - 0.5;
      const yOffset = (depthLayer - 1) * 0.3;

      const scaleMultiplier = 1 - depthLayer * 0.1;

      return {
        id: design.id,
        image: design.image,
        color: design.color,
        baseX: index * (itemWidth + gap),
        y: yOffset,
        z: zOffset,
        scale: [
          itemWidth * scaleMultiplier,
          itemHeight * scaleMultiplier,
          1,
        ] as [number, number, number],
        depthFactor: 1 + depthLayer * 0.5,
        parallaxSpeed: 1 - depthLayer * 0.2,
      };
    });
  }, [itemWidth, itemHeight, gap]);

  const scrollX = scrollPosition * 0.01;

  return (
    <group>
      {items.map((item) => {
        const centeredBaseX = item.baseX - totalWidth / 2 + itemWidth / 2;
        const rawX = centeredBaseX - scrollX;

        const parallaxOffset = scrollX * (1 - item.parallaxSpeed);
        const rawXWithParallax = rawX + parallaxOffset;

        const wrappedX =
          mod(rawXWithParallax + totalWidth / 2, totalWidth) - totalWidth / 2;

        return (
          <GalleryImageWithFallback
            key={item.id}
            url={item.image}
            color={item.color}
            index={item.id}
            position={[wrappedX, item.y, item.z]}
            scale={item.scale}
            scrollVelocity={scrollVelocity}
            mousePosition={mousePosition}
            depthFactor={item.depthFactor}
          />
        );
      })}
    </group>
  );
};

export const DesignGallery = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollUpdate = useCallback(
    (state: { position: number; velocity: number }) => {
      setScrollPosition(state.position);
      setScrollVelocity(state.velocity);
    },
    []
  );

  const { setContainerRef } = useGalleryScroll({
    sensitivity: 1.2,
    friction: 0.94,
    onUpdate: handleScrollUpdate,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleRef = useCallback(
    (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        el;
      setContainerRef(el);
    },
    [setContainerRef]
  );

  return (
    <div
      ref={handleRef}
      className="relative w-full h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden rounded-xl border border-border-subtle bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0a0a0f] dark:to-[#15151f]"
    >
      <GalleryCanvas>
        <GalleryScene
          scrollPosition={scrollPosition}
          scrollVelocity={scrollVelocity}
          mousePosition={mousePosition}
        />
      </GalleryCanvas>

      <div className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10 bg-gradient-to-r from-gray-100 dark:from-[#0a0a0f] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10 bg-gradient-to-l from-gray-100 dark:from-[#0a0a0f] to-transparent" />

      <div className="absolute inset-x-0 top-0 h-20 pointer-events-none z-10 bg-gradient-to-b from-gray-100/80 dark:from-[#0a0a0f]/80 to-transparent" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 text-gray-400 dark:text-white/30 text-sm font-light tracking-wider">
        <svg
          className="w-4 h-4 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        <span>drag or scroll</span>
        <svg
          className="w-4 h-4 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </div>
  );
};
