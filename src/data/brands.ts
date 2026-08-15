export type Brand = 'gibi' | 'almanac';

export interface BrandConfig {
  name: string;
  /** Usado nos metadados OG/canonical — precisa ser URL absoluta. */
  host: string;
  accent: string;
  bg: string;
  /** Fonte display (nome e títulos de seção). */
  displayFont: string;
  /** CSS do Google Fonts para a fonte display. */
  fontHref: string;
  /** Nome da marca em caixa alta no cabeçalho. */
  uppercaseName: boolean;
}

/**
 * DESIGN SYSTEM ÚNICO para as duas marcas (decisão do Lester,
 * 15/08/2026): layouts duplicados, mesma fonte (Unbounded — a dos
 * títulos de seção que ele aprovou), vermelho DE VERDADE no contorno
 * e fundo preto/grafite SEM tons azulados. As marcas diferem só em
 * nome e domínio.
 */
const DESIGN = {
  accent: '#ff1a1a',
  bg: '#0d0d0d',
  displayFont: "'Unbounded', system-ui, sans-serif",
  fontHref:
    'https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700&display=swap',
  uppercaseName: true,
} as const;

export const BRANDS: Record<Brand, BrandConfig> = {
  gibi: {
    name: 'GIBI Label',
    host: 'https://links.gibilabel.com',
    ...DESIGN,
  },
  almanac: {
    name: 'Almanac',
    host: 'https://links.duoalmanac.com',
    ...DESIGN,
  },
};
