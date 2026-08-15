import { supabase, SUPABASE_URL } from './supabase';
import type { Brand } from '../data/brands';

export interface FanlinkProfile {
  id: string;
  brand: Brand;
  display_name: string;
  bio: string | null;
  avatar_path: string | null;
  social_position: 'top' | 'bottom';
}

export interface FanlinkLink {
  id: string;
  section_id: string | null;
  title: string;
  url: string;
  thumb_url: string | null;
  layout: 'classic' | 'featured';
  embed: boolean;
  pinned: boolean;
  position: number;
}

export interface FanlinkSection {
  id: string;
  title: string | null;
  layout: string;
  position: number;
  links: FanlinkLink[];
}

export interface FanlinkSocial {
  id: string;
  network: string;
  url: string;
  position: number;
}

/** Bloco da lista vertical: seção (com seus links) ou link solto. */
export type Block =
  | { kind: 'section'; position: number; section: FanlinkSection }
  | { kind: 'link'; position: number; link: FanlinkLink };

export interface FanlinkPageData {
  profile: FanlinkProfile;
  socials: FanlinkSocial[];
  blocks: Block[];
}

const porPosicao = <T extends { position: number }>(a: T, b: T) => a.position - b.position;

/** Fixado primeiro, depois a ordem manual. */
const ordemDeLinks = (a: FanlinkLink, b: FanlinkLink) =>
  Number(b.pinned) - Number(a.pinned) || a.position - b.position;

export async function loadFanlinkPage(brand: Brand): Promise<FanlinkPageData | null> {
  const { data: profile } = await supabase
    .from('fanlink_profiles')
    .select('id, brand, display_name, bio, avatar_path, social_position')
    .eq('brand', brand)
    .maybeSingle();

  if (!profile) return null;

  // A RLS do anon já filtra ativo + fora da lixeira.
  const [{ data: sections }, { data: links }, { data: socials }] = await Promise.all([
    supabase
      .from('fanlink_sections')
      .select('id, title, layout, position')
      .eq('profile_id', profile.id),
    supabase
      .from('fanlink_links')
      .select('id, section_id, title, url, thumb_url, layout, embed, pinned, position')
      .eq('profile_id', profile.id),
    supabase
      .from('fanlink_socials')
      .select('id, network, url, position')
      .eq('profile_id', profile.id),
  ]);

  const todosLinks = (links ?? []) as FanlinkLink[];

  const secoes: Block[] = ((sections ?? []) as Omit<FanlinkSection, 'links'>[]).map((s) => ({
    kind: 'section',
    position: s.position,
    section: {
      ...s,
      links: todosLinks.filter((l) => l.section_id === s.id).sort(ordemDeLinks),
    },
  }));

  const soltos: Block[] = todosLinks
    .filter((l) => l.section_id === null)
    .sort(ordemDeLinks)
    .map((l) => ({ kind: 'link', position: l.position, link: l }));

  return {
    profile: profile as FanlinkProfile,
    socials: ((socials ?? []) as FanlinkSocial[]).sort(porPosicao),
    blocks: [...secoes, ...soltos].sort(porPosicao),
  };
}

/** avatar_path aceita URL completa (conteúdo migrado) ou caminho no bucket público. */
export function avatarUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/fanlink-assets/${path}`;
}

export interface EmbedInfo {
  src: string;
  /** Altura fixa em px, ou null para proporção 16:9. */
  height: number | null;
}

/** Player embutido a partir do padrão da URL (YouTube/Spotify/SoundCloud). */
export function embedInfo(url: string): EmbedInfo | null {
  const yt = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/))([\w-]{6,})/,
  );
  if (yt) return { src: `https://www.youtube-nocookie.com/embed/${yt[1]}`, height: null };

  const sp = url.match(
    /open\.spotify\.com\/(?:intl-[a-z-]+\/)?(track|album|playlist|artist|show|episode)\/([A-Za-z0-9]+)/,
  );
  if (sp) {
    const alto = sp[1] === 'album' || sp[1] === 'playlist' || sp[1] === 'artist';
    return { src: `https://open.spotify.com/embed/${sp[1]}/${sp[2]}`, height: alto ? 352 : 152 };
  }

  if (/soundcloud\.com\//.test(url)) {
    const params = new URLSearchParams({
      url,
      color: '#ff5347',
      auto_play: 'false',
      show_teaser: 'false',
    });
    return { src: `https://w.soundcloud.com/player/?${params}`, height: 166 };
  }

  return null;
}
