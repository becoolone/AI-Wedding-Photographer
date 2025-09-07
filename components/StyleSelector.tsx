import React from 'react';
import { WeddingStyle } from '../types';
import { WEDDING_STYLES } from '../constants';

interface StyleSelectorProps {
  selectedStyle: WeddingStyle;
  onStyleChange: (style: WeddingStyle) => void;
  customStyle: string;
  onCustomStyleChange: (value: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onStyleChange,
  customStyle,
  onCustomStyleChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {WEDDING_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`flex flex-col items-center justify-center p-4 text-center border-2 rounded-lg transition-all duration-200 aspect-square
              ${
                selectedStyle === style.id
                  ? 'border-violet-500 ring-2 ring-violet-500'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-violet-400'
              }`}
          >
            <style.icon className={`w-8 h-8 mb-2 ${selectedStyle === style.id ? 'text-violet-600 dark:text-violet-400' : 'text-slate-500 dark:text-slate-400'}`} />
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">{style.name}</span>
          </button>
        ))}
      </div>
      {selectedStyle === WeddingStyle.Custom && (
        <div className="animate-fade-in">
          <textarea
            value={customStyle}
            onChange={(e) => onCustomStyleChange(e.target.value)}
            placeholder="Describe your dream wedding scene, e.g., 'A romantic evening in Paris with the Eiffel Tower in the background under a starry sky.'"
            className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
            rows={3}
          />
        </div>
      )}
    </div>
  );
};