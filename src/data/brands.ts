export type Brand = 'gibi' | 'almanac';

export interface BrandConfig {
  name: string;
  /** Usado nos metadados OG/canonical — precisa ser URL absoluta. */
  host: string;
  accent: string;
  bg: string;
}

// Preto + vermelho nas DUAS marcas (padrão que os Linktrees atuais já
// usam; decisão do Lester, 15/08/2026). Ajuste fino de tom vem na v2.
export const BRANDS: Record<Brand, BrandConfig> = {
  gibi: {
    name: 'GIBI Label',
    host: 'https://links.gibilabel.com',
    accent: '#ff3b30',
    bg: '#0b0909',
  },
  almanac: {
    name: 'Almanac',
    host: 'https://links.duoalmanac.com',
    accent: '#ff5347',
    bg: '#0a0a0f',
  },
};
