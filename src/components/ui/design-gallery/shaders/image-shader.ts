import * as THREE from "three";

export const imageVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform vec2 uMouse;
  uniform float uHover;

  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Wave distortion based on scroll velocity
    float wave = sin(pos.x * 3.0 + uTime * 2.0) * 0.05;
    wave += sin(pos.y * 2.0 + uTime * 1.5) * 0.03;
    wave *= abs(uScrollVelocity) * 0.5;

    // Mouse proximity bulge effect
    vec2 mouseDir = uMouse - uv;
    float mouseDist = length(mouseDir);
    float bulge = smoothstep(0.5, 0.0, mouseDist) * uHover * 0.1;

    pos.z += wave + bulge;
    vWave = wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const imageFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uOpacity;

  varying vec2 vUv;
  varying float vWave;

  void main() {
    vec2 uv = vUv;

    // Chromatic aberration on hover
    float aberration = uHover * 0.008 + abs(uScrollVelocity) * 0.003;

    // RGB split
    float r = texture2D(uTexture, uv + vec2(aberration, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(aberration, 0.0)).b;

    vec3 color = vec3(r, g, b);

    // Subtle wave color shift
    color += vWave * 0.1;

    // Vignette effect
    vec2 vignetteUv = vUv * (1.0 - vUv);
    float vignette = vignetteUv.x * vignetteUv.y * 15.0;
    vignette = pow(vignette, 0.2);
    color *= vignette;

    // Slight brightness boost on hover
    color += uHover * 0.05;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

export const createImageShaderMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: null },
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
};
