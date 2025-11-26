import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import type { ReactNode } from "react";

interface GalleryCanvasProps {
  children: ReactNode;
}

export const GalleryCanvas = ({ children }: GalleryCanvasProps) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={1} />
      {children}
      <Preload all />
    </Canvas>
  );
};
