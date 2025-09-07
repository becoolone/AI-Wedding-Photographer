import React from 'react';
import { ImageIcon, AlertTriangleIcon } from './icons';

interface GeneratedImageDisplayProps {
  isLoading: boolean;
  error: string | null;
  imageUrl: string | null;
  onImageClick: () => void;
}

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 h-full">
     <svg className="animate-spin h-10 w-10 text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    <p className="mt-4 text-lg font-semibold text-slate-300">Creating your magical moment...</p>
    <p className="text-sm text-slate-400">This can take a minute. Please wait.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full w-full bg-red-900/30">
        <AlertTriangleIcon className="w-10 h-10 text-red-500" />
        <p className="mt-4 text-lg font-semibold text-red-300">Generation Failed</p>
        <p className="text-sm text-red-400 max-w-md">{message}</p>
    </div>
);

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 h-full">
    <ImageIcon className="w-16 h-16 text-slate-500" />
    <p className="mt-4 text-lg font-semibold text-slate-400">Your wedding picture will appear here</p>
    <p className="text-sm text-slate-500 mt-2">Click to zoom or preview before downloading.</p>
  </div>
);


export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ isLoading, error, imageUrl, onImageClick }) => {
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (imageUrl) {
    return (
      <div className="relative group w-full h-full">
        <img 
          src={imageUrl} 
          alt="Generated wedding" 
          className="w-full h-full object-cover" 
        />
        <div 
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          onClick={onImageClick}
          aria-hidden="true"
        >
          <p className="text-white text-lg font-bold">Click to view full size</p>
        </div>
      </div>
    );
  }

  return <Placeholder />;
};