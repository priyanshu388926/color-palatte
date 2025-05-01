import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Color } from '../types';
import { getContrastColor, hexToRgb, rgbToHsl } from '../utils/colorUtils';

interface ColorSwatchProps {
  color: Color;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  color, 
  size = 'md',
  showDetails = true
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const textColor = getContrastColor(color.hex);
  
  // Size classes
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Get color information
  const rgb = hexToRgb(color.hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 };
  
  return (
    <div 
      className={`relative flex flex-col items-center ${sizeClasses[size]} rounded-lg shadow-md transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
      style={{ backgroundColor: color.hex }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 flex items-center justify-center w-full">
        <button
          onClick={copyToClipboard}
          className={`p-2 rounded-full ${copied ? 'bg-green-500' : 'bg-white bg-opacity-20 hover:bg-opacity-30'} transition-colors duration-200`}
          aria-label={copied ? "Copied!" : "Copy color code"}
        >
          {copied ? <Check size={16} color={textColor} /> : <Copy size={16} color={textColor} />}
        </button>
      </div>
      
      {showDetails && (
        <div className="w-full px-2 py-1 text-center" style={{ color: textColor }}>
          <div className="font-mono text-sm truncate">{color.hex}</div>
          <div className="text-xs opacity-80 truncate">{color.name || ''}</div>
        </div>
      )}
      
      {isHovered && showDetails && (
        <div 
          className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg z-10 w-48"
        >
          <div className="text-xs font-mono space-y-1 text-gray-800">
            <div>HEX: {color.hex}</div>
            {rgb && <div>RGB: {rgb.r}, {rgb.g}, {rgb.b}</div>}
            <div>HSL: {hsl.h}°, {hsl.s}%, {hsl.l}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSwatch;