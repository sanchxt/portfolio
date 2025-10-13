// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    // @ts-ignore - Vite version mismatch between Astro and @tailwindcss/vite
    plugins: [tailwindcss()],
  },
});
