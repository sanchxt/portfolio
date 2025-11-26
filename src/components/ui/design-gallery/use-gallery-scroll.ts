import { useRef, useEffect, useCallback } from "react";

interface ScrollState {
  position: number;
  velocity: number;
  targetPosition: number;
}

interface UseGalleryScrollOptions {
  sensitivity?: number;
  friction?: number;
  onUpdate?: (state: ScrollState) => void;
}

export const useGalleryScroll = (options: UseGalleryScrollOptions = {}) => {
  const { sensitivity = 1.5, friction = 0.92, onUpdate } = options;

  const stateRef = useRef<ScrollState>({
    position: 0,
    velocity: 0,
    targetPosition: 0,
  });

  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const lastClientXRef = useRef(0);

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  const animate = useCallback(() => {
    const state = stateRef.current;

    state.velocity *= friction;

    state.position += state.velocity;

    state.position = lerp(state.position, state.targetPosition, 0.1);

    const velocityForShader = state.targetPosition - state.position;

    if (onUpdate) {
      onUpdate({
        position: state.position,
        velocity: velocityForShader * 0.1,
        targetPosition: state.targetPosition,
      });
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [friction, onUpdate]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      stateRef.current.targetPosition += delta * sensitivity;
      stateRef.current.velocity += delta * 0.1;
    },
    [sensitivity]
  );

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDraggingRef.current = true;
    lastClientXRef.current = e.clientX;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const delta = lastClientXRef.current - e.clientX;
      lastClientXRef.current = e.clientX;

      stateRef.current.targetPosition += delta * sensitivity * 2;
      stateRef.current.velocity += delta * 0.2;
    },
    [sensitivity]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    isDraggingRef.current = true;
    lastClientXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDraggingRef.current) return;

      const delta = lastClientXRef.current - e.touches[0].clientX;
      lastClientXRef.current = e.touches[0].clientX;

      stateRef.current.targetPosition += delta * sensitivity * 2;
      stateRef.current.velocity += delta * 0.2;
    },
    [sensitivity]
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const setContainerRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("wheel", handleWheel);
        containerRef.current.removeEventListener("mousedown", handleMouseDown);
        containerRef.current.removeEventListener(
          "touchstart",
          handleTouchStart
        );
      }

      containerRef.current = element;

      if (element) {
        element.addEventListener("wheel", handleWheel, { passive: false });
        element.addEventListener("mousedown", handleMouseDown);
        element.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        element.style.cursor = "grab";
      }
    },
    [handleWheel, handleMouseDown, handleTouchStart]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    animate,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return {
    setContainerRef,
    getState: () => stateRef.current,
    setPosition: (pos: number) => {
      stateRef.current.position = pos;
      stateRef.current.targetPosition = pos;
    },
  };
};
