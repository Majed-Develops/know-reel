import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
<<<<<<< HEAD
    port: 5173
=======
    port: 5173,
    open: true
>>>>>>> bcdfe73c3985c68cca8b9b36205fac2571a40cf2
  }
});
