// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore - Vite version mismatch between Astro and @tailwindcss/vite
    plugins: [tailwindcss()],
  },
});
