# Fanlinks — GIBI Label + Almanac

Páginas de link-in-bio (estilo Linktree, rumo ao Komi) servidas por UM
projeto Vercel em dois domínios:

- `links.gibilabel.com` → marca GIBI
- `links.duoalmanac.com` → marca Almanac

**O conteúdo mora no Supabase do Almanac Center** (tabelas `fanlink_*`,
migration `20260815120000`): perfil, seções, links e ícones sociais.
Esta página é SSR (`@astrojs/vercel`) e lê o banco com a anon key — a
RLS entrega só o que está ativo e fora da lixeira. Salvou no admin do
Center (Marketing → Links), o link público reflete em ~1 min (cache
CDN `s-maxage=60`). Sem redeploy.

O roteamento por domínio é feito em `src/middleware.ts` (hostname →
`/gibi` ou `/almanac`). Não usar rewrites do `vercel.json`: com o
adapter Vercel eles não se aplicam (Build Output API).

## Estrutura

```
src/middleware.ts          hostname → marca
src/data/brands.ts         nome, domínio e cores por marca
src/lib/supabase.ts        cliente (anon; env vars opcionais)
src/lib/fanlink.ts         carga da página, blocos, parser de embed
src/components/BioPage.astro    a página inteira
src/components/LinkCard.astro   botão / destaque / player embed
src/components/SocialIcon.astro ícones (simple-icons)
```

## Comandos

```
npm run dev       dev server SSR (localhost:4321)
npm run build     build de produção (Build Output API)
```

## Setup na Vercel (uma vez)

1. Repo no GitHub (`duoalmanac/fanlinks`) → Import na Vercel
   (framework Astro, detectado sozinho).
2. Em Project → Settings → Domains, adicionar `links.gibilabel.com` e
   `links.duoalmanac.com`.
3. No DNS de cada domínio, criar o CNAME que a Vercel indicar
   (`links` → `cname.vercel-dns.com`).
4. Conferir nos dois domínios: perfil, links com capa, embed do
   YouTube e ícones sociais.

Env vars são OPCIONAIS (`PUBLIC_SUPABASE_URL`,
`PUBLIC_SUPABASE_ANON_KEY`) — sem elas o código usa os valores
públicos do projeto de SP, os mesmos do bundle do Center.
