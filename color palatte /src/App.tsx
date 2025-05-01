import React, { useState, useEffect } from 'react';
import { Palette, Color, HarmonyType } from './types';
import { generatePalette, generatePaletteId } from './utils/paletteGenerator';
import { generateRandomColor } from './utils/colorUtils';
import ColorPicker from './components/ColorPicker';
import PaletteDisplay from './components/PaletteDisplay';
import PaletteControls from './components/PaletteControls';
import PaletteHistory from './components/PaletteHistory';
import { PaintBucket } from 'lucide-react';

function App() {
  // State for base colors
  const [baseColors, setBaseColors] = useState<Color[]>([
    { hex: generateRandomColor() }
  ]);
  
  // State for generated palette
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null);
  
  // State for palette settings
  const [harmonyType, setHarmonyType] = useState<HarmonyType>('analogous');
  const [colorCount, setColorCount] = useState(5);
  
  // State for saved palettes
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>(() => {
    const saved = localStorage.getItem('color-palettes');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Save palettes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('color-palettes', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  // Generate a palette based on current settings
  const handleGeneratePalette = () => {
    if (baseColors.length === 0) return;
    
    const generatedColors = generatePalette(baseColors, harmonyType, colorCount);
    
    const newPalette: Palette = {
      id: generatePaletteId(),
      baseColors: [...baseColors],
      generatedColors,
      timestamp: Date.now()
    };
    
    setCurrentPalette(newPalette);
  };
  
  // Generate initial palette on component mount
  useEffect(() => {
    handleGeneratePalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Save the current palette
  const handleSavePalette = (palette: Palette) => {
    setSavedPalettes([palette, ...savedPalettes]);
  };
  
  // Load a saved palette
  const handleSelectPalette = (palette: Palette) => {
    setBaseColors(palette.baseColors);
    setCurrentPalette(palette);
  };
  
  // Delete a saved palette
  const handleDeletePalette = (id: string) => {
    setSavedPalettes(savedPalettes.filter(p => p.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-gradient-slow">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <PaintBucket className="text-indigo-600 mr-2" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Color Palette Generator
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate beautiful color palettes for your designs. Select base colors and harmony type to create the perfect color scheme.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Base Colors</h2>
              <ColorPicker 
                colors={baseColors} 
                onChange={setBaseColors} 
                maxColors={3}
              />
            </div>
            
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Palette Settings</h2>
              <PaletteControls 
                harmony={harmonyType}
                colorCount={colorCount}
                onHarmonyChange={setHarmonyType}
                onColorCountChange={setColorCount}
                onGenerate={handleGeneratePalette}
              />
            </div>
            
            {currentPalette && (
              <PaletteDisplay 
                palette={currentPalette} 
                onSave={handleSavePalette}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Palettes</h2>
              <PaletteHistory 
                palettes={savedPalettes}
                onSelect={handleSelectPalette}
                onDelete={handleDeletePalette}
              />
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2025 Color Palette Generator. Designed with 💜</p>
        </footer>
      </div>
    </div>
  );
}

export default App;