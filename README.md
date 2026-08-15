# Fanlinks — GIBI Label + Almanac

Páginas de fanlink (estilo Linkfire) servidas por UM projeto Vercel em
dois domínios:

- `links.gibilabel.com` → páginas em `src/pages/gibi/`
- `links.duoalmanac.com` → páginas em `src/pages/almanac/`

O `vercel.json` faz o rewrite por hostname: quem visita
`links.gibilabel.com/meu-release` recebe `/gibi/meu-release` sem ver o
prefixo. Os rewrites EXCLUEM `/covers/`, `/_astro/` e o favicon — sem
essa exclusão, os assets virariam 404.

## Adicionar um release

1. Colocar a capa em `public/covers/` — **JPG ou PNG, mínimo 640×640**
   (SVG não aparece no card de preview do WhatsApp).
2. Adicionar uma entrada em `src/data/releases.ts` (slug, marca, título,
   artista, capa e os links das plataformas — só os preenchidos viram
   botão).
3. Commit + push → a Vercel publica sozinha.

A URL pública fica `https://links.<dominio>/<slug>`.

## Marcas

Nome, domínio e cores de cada marca em `src/data/brands.ts`.
As cores atuais são placeholder.

## Comandos

```
npm run dev       dev server (localhost:4321)
npm run build     gera o site estático em dist/
npm run preview   serve o build local
```

## Setup na Vercel (uma vez)

1. Repo no GitHub (`duoalmanac/fanlinks`) → Import na Vercel
   (framework: Astro, detectado sozinho).
2. Em Project → Settings → Domains, adicionar `links.gibilabel.com` e
   `links.duoalmanac.com`.
3. No DNS de cada domínio, criar o CNAME que a Vercel indicar
   (`links` → `cname.vercel-dns.com`).
4. Depois do primeiro deploy, conferir nos dois domínios que a capa
   carrega (prova de que as exclusões do rewrite estão certas).
