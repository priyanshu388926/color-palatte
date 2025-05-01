import React from 'react';
import { HarmonyType } from '../types';

interface PaletteControlsProps {
  harmony: HarmonyType;
  colorCount: number;
  onHarmonyChange: (harmony: HarmonyType) => void;
  onColorCountChange: (count: number) => void;
  onGenerate: () => void;
}

const PaletteControls: React.FC<PaletteControlsProps> = ({
  harmony,
  colorCount,
  onHarmonyChange,
  onColorCountChange,
  onGenerate
}) => {
  const harmonyOptions: { value: HarmonyType; label: string }[] = [
    { value: 'analogous', label: 'Analogous' },
    { value: 'complementary', label: 'Complementary' },
    { value: 'triadic', label: 'Triadic' },
    { value: 'tetradic', label: 'Tetradic' },
    { value: 'monochromatic', label: 'Monochromatic' },
    { value: 'shades', label: 'Shades' }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-end">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800">Harmony Type</label>
        <select
          value={harmony}
          onChange={(e) => onHarmonyChange(e.target.value as HarmonyType)}
          className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
        >
          {harmonyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800">Colors (3-10)</label>
        <input
          type="range"
          min="3"
          max="10"
          value={colorCount}
          onChange={(e) => onColorCountChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-xs text-gray-600 text-center">{colorCount} colors</div>
      </div>
      
      <button
        onClick={onGenerate}
        className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
      >
        Generate Palette
      </button>
    </div>
  );
};

export default PaletteControls;