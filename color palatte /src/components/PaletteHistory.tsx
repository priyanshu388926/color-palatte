import React from 'react';
import { Palette } from '../types';
import { Trash2 } from 'lucide-react';

interface PaletteHistoryProps {
  palettes: Palette[];
  onSelect: (palette: Palette) => void;
  onDelete: (id: string) => void;
}

const PaletteHistory: React.FC<PaletteHistoryProps> = ({ 
  palettes, 
  onSelect, 
  onDelete 
}) => {
  if (palettes.length === 0) {
    return (
      <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg">
        <p className="text-gray-600">No saved palettes yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {palettes.map((palette) => (
        <div 
          key={palette.id}
          className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-800">
              {palette.name || new Date(palette.timestamp).toLocaleDateString()}
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(palette.id);
              }}
              className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 text-red-500"
              aria-label="Delete palette"
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          <div 
            className="flex gap-1 h-6 rounded-md overflow-hidden"
            onClick={() => onSelect(palette)}
          >
            {palette.generatedColors.map((color, index) => (
              <div 
                key={index} 
                className="flex-1 h-full" 
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaletteHistory;