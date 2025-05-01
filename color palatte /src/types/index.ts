export interface Color {
  hex: string;
  name?: string;
}

export interface Palette {
  id: string;
  baseColors: Color[];
  generatedColors: Color[];
  timestamp: number;
  name?: string;
}

export type HarmonyType = 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'monochromatic' | 'shades';