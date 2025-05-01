import { useState, useEffect } from 'react';
import { Palette } from '../types';

// Store palettes in localStorage
const STORAGE_KEY = 'color-palettes';

export const usePalettes = () => {
  const [palettes, setPalettes] = useState<Palette[]>(() => {
    // Load saved palettes from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save palettes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes));
  }, [palettes]);

  // Add a new palette
  const savePalette = (palette: Palette) => {
    // Check if this palette already exists
    const existing = palettes.find(p => p.id === palette.id);
    
    if (existing) {
      // Update existing palette
      setPalettes(
        palettes.map(p => (p.id === palette.id ? { ...p, ...palette } : p))
      );
    } else {
      // Add new palette
      setPalettes([palette, ...palettes]);
    }
  };

  // Delete a palette
  const deletePalette = (id: string) => {
    setPalettes(palettes.filter(p => p.id !== id));
  };

  // Clear all palettes
  const clearPalettes = () => {
    setPalettes([]);
  };

  return {
    palettes,
    savePalette,
    deletePalette,
    clearPalettes
  };
};