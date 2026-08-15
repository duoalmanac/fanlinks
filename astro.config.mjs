import { defineConfig } from 'astro/config';

export default defineConfig({
  build: {
    // CSS embutido no HTML: menos assets soltos para os rewrites
    // por hostname do vercel.json tratarem.
    inlineStylesheets: 'always',
  },
});
