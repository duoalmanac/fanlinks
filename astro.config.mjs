import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // SSR: a página lê o Supabase a cada visita (com cache curto na CDN).
  // Mudou no admin do Center, mudou no link — sem redeploy.
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'always',
  },
});
