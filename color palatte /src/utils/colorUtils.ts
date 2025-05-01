// Function to convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex
  const bigint = parseInt(hex, 16);
  if (isNaN(bigint)) return null;
  
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return { r, g, b };
};

// Function to convert RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

// Function to convert RGB to HSL
export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

// Function to convert HSL to RGB
export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r: number, g: number, b: number;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

// Function to generate a random color
export const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

// Function to check if a color is light or dark
export const isColorLight = (hex: string): boolean => {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  
  // Calculate brightness using the YIQ formula
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness >= 128; // if >= 128, color is light
};

// Function to generate a contrasting text color (black or white) based on background
export const getContrastColor = (hex: string): string => {
  return isColorLight(hex) ? '#000000' : '#ffffff';
};

// Function to get a pretty name for a color
export const getColorName = (hex: string): string => {
  // This is a simplified version. In a real app, you might use a color naming library
  const rgb = hexToRgb(hex);
  if (!rgb) return 'Unknown';
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Very basic color naming
  if (hsl.s < 10) {
    if (hsl.l < 20) return 'Black';
    if (hsl.l > 80) return 'White';
    return 'Gray';
  }
  
  if (hsl.h < 30) return 'Red';
  if (hsl.h < 60) return 'Orange';
  if (hsl.h < 90) return 'Yellow';
  if (hsl.h < 150) return 'Green';
  if (hsl.h < 210) return 'Cyan';
  if (hsl.h < 270) return 'Blue';
  if (hsl.h < 330) return 'Purple';
  return 'Red';
};