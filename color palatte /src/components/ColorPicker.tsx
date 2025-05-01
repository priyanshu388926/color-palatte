import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Color } from '../types';
import { generateRandomColor } from '../utils/colorUtils';

interface ColorPickerProps {
  colors: Color[];
  onChange: (colors: Color[]) => void;
  maxColors?: number;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  colors, 
  onChange, 
  maxColors = 5 
}) => {
  const [currentColor, setCurrentColor] = useState('#6366f1'); // Default color

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
  };

  const addColor = () => {
    if (colors.length >= maxColors) return;
    
    onChange([...colors, { hex: currentColor }]);
    // Set a new random color for the next addition
    setCurrentColor(generateRandomColor());
  };

  const removeColor = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    onChange(newColors);
  };

  const addRandomColor = () => {
    if (colors.length >= maxColors) return;
    
    const randomColor = generateRandomColor();
    onChange([...colors, { hex: randomColor }]);
  };

  const updateColor = (index: number, newHex: string) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], hex: newHex };
    onChange(newColors);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {colors.map((color, index) => (
          <div key={index} className="relative group">
            <input
              type="color"
              value={color.hex}
              onChange={(e) => updateColor(index, e.target.value)}
              className="w-12 h-12 rounded-full cursor-pointer border-2 border-white"
              style={{ backgroundColor: color.hex }}
            />
            <button
              onClick={() => removeColor(index)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Remove color"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {colors.length < maxColors && (
          <div className="flex gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={currentColor}
                onChange={handleColorChange}
                className="w-12 h-12 rounded-full cursor-pointer border-2 border-white"
              />
              <button
                onClick={addColor}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
                aria-label="Add color"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={addRandomColor}
              className="bg-white px-3 py-1 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200 text-sm"
            >
              Random
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;