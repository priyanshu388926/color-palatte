import { HarmonyType, Color } from '../types';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, getColorName } from './colorUtils';

// Helper function to ensure hue stays in 0-360 range
const normalizeHue = (hue: number): number => {
  return ((hue % 360) + 360) % 360;
};

// Generate colors based on harmony type and base colors
export const generatePalette = (baseColors: Color[], harmonyType: HarmonyType, count: number = 5): Color[] => {
  if (baseColors.length === 0) return [];
  
  // Using the first base color for single-color harmonies
  const baseColor = baseColors[0];
  const baseRgb = hexToRgb(baseColor.hex);
  
  if (!baseRgb) return [];
  
  const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
  
  switch (harmonyType) {
    case 'analogous':
      return generateAnalogous(baseHsl, count);
    case 'complementary':
      return generateComplementary(baseHsl, count);
    case 'triadic':
      return generateTriadic(baseHsl, count);
    case 'tetradic':
      return generateTetradic(baseHsl, count);
    case 'monochromatic':
      return generateMonochromatic(baseHsl, count);
    case 'shades':
      return generateShades(baseHsl, count);
    default:
      return [];
  }
};

// Generate analogous colors (adjacent on the color wheel)
const generateAnalogous = (baseHsl: { h: number; s: number; l: number }, count: number): Color[] => {
  const colors: Color[] = [];
  const hueStep = 30;
  
  const startHue = normalizeHue(baseHsl.h - (count - 1) / 2 * hueStep);
  
  for (let i = 0; i < count; i++) {
    const hue = normalizeHue(startHue + i * hueStep);
    const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    colors.push({ hex, name: getColorName(hex) });
  }
  
  return colors;
};

// Generate complementary colors (opposite on the color wheel)
const generateComplementary = (baseHsl: { h: number; s: number; l: number }, count: number): Color[] => {
  const colors: Color[] = [];
  const complementHue = normalizeHue(baseHsl.h + 180);
  
  // Add variations around the base color
  const baseCount = Math.ceil(count / 2);
  for (let i = 0; i < baseCount; i++) {
    const variation = i * 15;
    const hue = normalizeHue(baseHsl.h + variation);
    const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    colors.push({ hex, name: getColorName(hex) });
  }
  
  // Add variations around the complementary color
  const compCount = count - baseCount;
  for (let i = 0; i < compCount; i++) {
    const variation = i * 15;
    const hue = normalizeHue(complementHue + variation);
    const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    colors.push({ hex, name: getColorName(hex) });
  }
  
  return colors;
};

// Generate triadic colors (three colors evenly spaced)
const generateTriadic = (baseHsl: { h: number; s: number; l: number }, count: number): Color[] => {
  const colors: Color[] = [];
  const triads = [
    baseHsl.h,
    normalizeHue(baseHsl.h + 120),
    normalizeHue(baseHsl.h + 240)
  ];
  
  const variationsPerTriad = Math.ceil(count / 3);
  
  for (let i = 0; i < triads.length; i++) {
    for (let j = 0; j < variationsPerTriad; j++) {
      if (colors.length >= count) break;
      
      const variation = j * 10 - (variationsPerTriad * 10) / 2;
      const hue = normalizeHue(triads[i] + variation);
      const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      colors.push({ hex, name: getColorName(hex) });
    }
  }
  
  return colors;
};

// Generate tetradic colors (four colors forming a rectangle on the color wheel)
const generateTetradic = (baseHsl: { h: number; s: number; l: number }, count: number): Color[] => {
  const colors: Color[] = [];
  const tetrads = [
    baseHsl.h,
    normalizeHue(baseHsl.h + 90),
    normalizeHue(baseHsl.h + 180),
    normalizeHue(baseHsl.h + 270)
  ];
  
  const variationsPerTetrad = Math.ceil(count / 4);
  
  for (let i = 0; i < tetrads.length; i++) {
    for (let j = 0; j < variationsPerTetrad; j++) {
      if (colors.length >= count) break;
      
      const variation = j * 10 - (variationsPerTetrad * 10) / 2;
      const hue = normalizeHue(tetrads[i] + variation);
      const rgb = hslToRgb(hue, baseHsl.s, baseHsl.l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      colors.push({ hex, name: getColorName(hex) });
    }
  }
  
  return colors;
};

// Generate monochromatic colors (variations in saturation and lightness)
const generateMonochromatic = (baseHsl: { h: number; s: number; l: number }, count: number): Color[] => {
  const colors: Color[] = [];
  
  for (let i = 0; i < count; i++) {
    // Vary saturation and lightness
    const saturation = Math.min(100, Math.max(20, baseHsl.s - 20 + i * 10));
    const lightness = Math.min(90, Math.max(10, baseHsl.l - 20 + i * 10));
    
    const rgb = hslToRgb(baseHsl.h, saturation, lightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    colors.push({ hex, name: getColorName(hex) });
  }
  
  return colors;
};

// Generate shades (variations in lightness only)
const generateShades = (baseHsl: { h: number; s: number; l: number }, count: number): Color[] => {
  const colors: Color[] = [];
  
  for (let i = 0; i < count; i++) {
    // Calculate lightness from dark to light (10% to 90%)
    const lightness = 10 + (i * 80) / (count - 1);
    
    const rgb = hslToRgb(baseHsl.h, baseHsl.s, lightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    colors.push({ hex, name: getColorName(hex) });
  }
  
  return colors;
};

// Generate a palette ID
export const generatePaletteId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};