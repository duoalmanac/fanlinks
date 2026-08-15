import { defineMiddleware } from 'astro:middleware';

/**
 * Roteamento por HOSTNAME: um projeto, dois domínios.
 * links.gibilabel.com/*  → /gibi/*
 * links.duoalmanac.com/* → /almanac/*
 *
 * Feito em middleware (não em vercel.json): com o adapter Vercel o
 * roteamento vem do Build Output API e os rewrites do vercel.json
 * não se aplicam. Assets estáticos nunca chegam aqui.
 */
export const onRequest = defineMiddleware((ctx, next) => {
  const host = ctx.request.headers.get('host') ?? '';
  const path = ctx.url.pathname;

  // Já namespaced ou arquivo — segue direto.
  if (path.startsWith('/gibi') || path.startsWith('/almanac') || path.includes('.')) {
    return next();
  }

  const sufixo = path === '/' ? '' : path;
  if (host.startsWith('links.gibilabel.com')) return next('/gibi' + sufixo);
  if (host.startsWith('links.duoalmanac.com')) return next('/almanac' + sufixo);
  return next();
});
