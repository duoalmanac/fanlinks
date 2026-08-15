// Cadastro de releases. Adicionar um release = uma entrada aqui + capa
// em public/covers/. A capa precisa ser JPG ou PNG (mínimo 640×640) —
// SVG não aparece no card de preview do WhatsApp.

export type Brand = 'gibi' | 'almanac';

export type Service =
  | 'spotify'
  | 'appleMusic'
  | 'youtube'
  | 'youtubeMusic'
  | 'deezer'
  | 'soundcloud'
  | 'beatport'
  | 'tidal'
  | 'amazonMusic';

export interface Release {
  /** Vira a URL pública: links.duoalmanac.com/<slug> */
  slug: string;
  brand: Brand;
  title: string;
  artist: string;
  /** Caminho dentro de public/, ex.: /covers/meu-release.jpg */
  cover: string;
  /** AAAA-MM-DD, informativo */
  releaseDate?: string;
  links: Partial<Record<Service, string>>;
}

export const SERVICE_LABELS: Record<Service, string> = {
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  youtube: 'YouTube',
  youtubeMusic: 'YouTube Music',
  deezer: 'Deezer',
  soundcloud: 'SoundCloud',
  beatport: 'Beatport',
  tidal: 'TIDAL',
  amazonMusic: 'Amazon Music',
};

/** Ordem em que os botões aparecem na página. */
export const SERVICE_ORDER: Service[] = [
  'spotify',
  'appleMusic',
  'youtube',
  'youtubeMusic',
  'deezer',
  'soundcloud',
  'beatport',
  'tidal',
  'amazonMusic',
];

export const releases: Release[] = [
  {
    slug: 'exemplo',
    brand: 'gibi',
    title: 'Release de Exemplo',
    artist: 'Artista GIBI',
    cover: '/covers/exemplo-gibi.svg',
    releaseDate: '2026-08-15',
    links: {
      spotify: 'https://open.spotify.com/',
      appleMusic: 'https://music.apple.com/',
      youtube: 'https://youtube.com/',
      deezer: 'https://deezer.com/',
      beatport: 'https://beatport.com/',
    },
  },
  {
    slug: 'exemplo',
    brand: 'almanac',
    title: 'Release de Exemplo',
    artist: 'Almanac',
    cover: '/covers/exemplo-almanac.svg',
    releaseDate: '2026-08-15',
    links: {
      spotify: 'https://open.spotify.com/',
      appleMusic: 'https://music.apple.com/',
      soundcloud: 'https://soundcloud.com/',
      beatport: 'https://beatport.com/',
    },
  },
];
