export interface BrandConfig {
  name: string;
  /** Usado nos metadados OG/canonical — precisa ser URL absoluta. */
  host: string;
  accent: string;
  bg: string;
}

// ⚠️ Cores placeholder — trocar pelas oficiais das duas marcas.
export const BRANDS: Record<'gibi' | 'almanac', BrandConfig> = {
  gibi: {
    name: 'GIBI Label',
    host: 'https://links.gibilabel.com',
    accent: '#ffd84d',
    bg: '#0c0a06',
  },
  almanac: {
    name: 'Almanac',
    host: 'https://links.duoalmanac.com',
    accent: '#ff5347',
    bg: '#0a0a0f',
  },
};
