import { useRef, useMemo, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { imageVertexShader, imageFragmentShader } from "./shaders/image-shader";

interface GalleryImageProps {
  url: string;
  index: number;
  position: [number, number, number];
  scale: [number, number, number];
  scrollVelocity: number;
  mousePosition: { x: number; y: number };
  depthFactor: number;
}

export const GalleryImage = ({
  url,
  position,
  scale,
  scrollVelocity,
  mousePosition,
  depthFactor,
}: GalleryImageProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(0);

  const texture = useLoader(THREE.TextureLoader, url);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uScrollVelocity: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uOpacity: { value: 1 },
      },
      vertexShader: imageVertexShader,
      fragmentShader: imageFragmentShader,
      transparent: true,
    });
  }, [texture]);

  useFrame((state) => {
    if (!meshRef.current || !shaderMaterial) return;

    const time = state.clock.getElapsedTime();

    const targetHover = isHovered ? 1 : 0;
    hoverRef.current += (targetHover - hoverRef.current) * 0.1;

    shaderMaterial.uniforms.uTime.value = time;
    shaderMaterial.uniforms.uScrollVelocity.value = scrollVelocity;
    shaderMaterial.uniforms.uHover.value = hoverRef.current;
    shaderMaterial.uniforms.uMouse.value.set(mousePosition.x, mousePosition.y);

    const targetRotationX = (mousePosition.y - 0.5) * 0.1 * depthFactor;
    const targetRotationY = (mousePosition.x - 0.5) * -0.1 * depthFactor;

    meshRef.current.rotation.x +=
      (targetRotationX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y +=
      (targetRotationY - meshRef.current.rotation.y) * 0.05;

    const targetScale = isHovered ? 1.05 : 1;
    meshRef.current.scale.x +=
      (scale[0] * targetScale - meshRef.current.scale.x) * 0.1;
    meshRef.current.scale.y +=
      (scale[1] * targetScale - meshRef.current.scale.y) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export const PlaceholderImage = ({
  index,
  position,
  scale,
  scrollVelocity,
  mousePosition,
  depthFactor,
  color,
}: Omit<GalleryImageProps, "url"> & { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(0);

  const shaderMaterial = useMemo(() => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScrollVelocity: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uColor: { value: new THREE.Vector3(r, g, b) },
        uIndex: { value: index },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uScrollVelocity;

        varying vec2 vUv;
        varying float vWave;

        void main() {
          vUv = uv;

          vec3 pos = position;

          float wave = sin(pos.x * 3.0 + uTime * 2.0) * 0.05;
          wave += sin(pos.y * 2.0 + uTime * 1.5) * 0.03;
          wave *= abs(uScrollVelocity) * 0.5;

          pos.z += wave;
          vWave = wave;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uHover;
        uniform vec3 uColor;
        uniform float uIndex;

        varying vec2 vUv;
        varying float vWave;

        // Noise function
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
          vec2 uv = vUv;

          // Gradient base
          vec3 color = uColor;

          // Add subtle gradient variation
          color += 0.1 * vec3(uv.x * 0.5, uv.y * 0.3, sin(uTime * 0.5) * 0.1);

          // Noise texture
          float noise = random(uv * 100.0 + uTime * 0.1) * 0.03;
          color += noise;

          // Wave color shift
          color += vWave * 0.15;

          // Vignette
          vec2 vignetteUv = vUv * (1.0 - vUv);
          float vignette = vignetteUv.x * vignetteUv.y * 15.0;
          vignette = pow(vignette, 0.15);
          color *= vignette;

          // Hover brightness
          color += uHover * 0.08;

          // Slight chromatic aberration on edges
          float edgeDist = length(vUv - 0.5);
          color.r += edgeDist * uHover * 0.05;
          color.b -= edgeDist * uHover * 0.05;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
    });
  }, [color, index]);

  useFrame((state) => {
    if (!meshRef.current || !shaderMaterial) return;

    const time = state.clock.getElapsedTime();

    const targetHover = isHovered ? 1 : 0;
    hoverRef.current += (targetHover - hoverRef.current) * 0.1;

    shaderMaterial.uniforms.uTime.value = time;
    shaderMaterial.uniforms.uScrollVelocity.value = scrollVelocity;
    shaderMaterial.uniforms.uHover.value = hoverRef.current;
    shaderMaterial.uniforms.uMouse.value.set(mousePosition.x, mousePosition.y);

    const targetRotationX = (mousePosition.y - 0.5) * 0.12 * depthFactor;
    const targetRotationY = (mousePosition.x - 0.5) * -0.12 * depthFactor;

    meshRef.current.rotation.x +=
      (targetRotationX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y +=
      (targetRotationY - meshRef.current.rotation.y) * 0.05;

    const targetScale = isHovered ? 1.08 : 1;
    meshRef.current.scale.x +=
      (scale[0] * targetScale - meshRef.current.scale.x) * 0.1;
    meshRef.current.scale.y +=
      (scale[1] * targetScale - meshRef.current.scale.y) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};
