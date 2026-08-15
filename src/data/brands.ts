export type Brand = 'gibi' | 'almanac';

export interface BrandConfig {
  name: string;
  /** Usado nos metadados OG/canonical — precisa ser URL absoluta. */
  host: string;
  accent: string;
  bg: string;
  /** Fonte display (nome, títulos de seção, rodapé). */
  displayFont: string;
  /** CSS do Google Fonts para a fonte display. */
  fontHref: string;
  /** Nome da marca em caixa alta no cabeçalho. */
  uppercaseName: boolean;
}

// Preto + vermelho nas DUAS marcas (padrão dos Linktrees originais).
// v2 (Fase 5): cada marca ganha uma fonte display própria — Almanac
// com Unbounded (eletrônica/moderna), GIBI com Archivo Black (poster,
// na vibe gibi/quadrinho sem ser caricata). Ajustes finos por conta
// da direção de arte do Lester.
export const BRANDS: Record<Brand, BrandConfig> = {
  gibi: {
    name: 'GIBI Label',
    host: 'https://links.gibilabel.com',
    accent: '#ff3b30',
    bg: '#0b0909',
    displayFont: "'Archivo Black', system-ui, sans-serif",
    fontHref: 'https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap',
    uppercaseName: true,
  },
  almanac: {
    name: 'Almanac',
    host: 'https://links.duoalmanac.com',
    accent: '#ff5347',
    bg: '#0a0a0f',
    displayFont: "'Unbounded', system-ui, sans-serif",
    fontHref:
      'https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700&display=swap',
    uppercaseName: false,
  },
};
