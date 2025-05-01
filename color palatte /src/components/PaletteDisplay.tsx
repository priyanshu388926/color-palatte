import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { Color, Palette } from '../types';
import ColorSwatch from './ColorSwatch';

interface PaletteDisplayProps {
  palette: Palette;
  onSave?: (palette: Palette) => void;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ palette, onSave }) => {
  const handleSave = () => {
    if (onSave) {
      onSave(palette);
    }
  };

  const handleShare = () => {
    // Create a shareable string with color codes
    const colorCodes = palette.generatedColors.map(c => c.hex).join(', ');
    const shareText = `Check out this color palette: ${colorCodes}`;
    
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: 'Color Palette',
        text: shareText,
      }).catch(console.error);
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Palette info copied to clipboard!');
    }
  };

  // Format the date
  const formattedDate = new Date(palette.timestamp).toLocaleDateString();

  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {palette.name || `Palette ${formattedDate}`}
          </h3>
          <p className="text-sm text-gray-600">{palette.generatedColors.length} colors</p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleSave}
            className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors duration-200"
            aria-label="Save palette"
          >
            <Download size={18} />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors duration-200"
            aria-label="Share palette"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {palette.generatedColors.map((color, index) => (
          <ColorSwatch key={index} color={color} />
        ))}
      </div>
      
      {palette.baseColors.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Base Colors</h4>
          <div className="flex flex-wrap gap-2">
            {palette.baseColors.map((color, index) => (
              <ColorSwatch key={index} color={color} size="sm" showDetails={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaletteDisplay;