
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon, XIcon, UserIcon } from './icons';
import type { UploadedImageFile } from '../types';


interface ImageUploaderProps {
  id: string;
  label: string;
  onImageUpload: (file: UploadedImageFile) => void;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, onImageUpload, onClear }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((files: FileList | null) => {
    const file = files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const mimeType = result.split(';')[0].split(':')[1];
        const base64 = result.split(',')[1];
        
        onImageUpload({ base64, mimeType, previewUrl: URL.createObjectURL(file) });
        setImagePreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setImagePreview(null);
    onClear();
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const dragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const dragEnter = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const dragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const fileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };
  
  if (imagePreview) {
    return (
      <div className="relative group aspect-square">
        <img src={imagePreview} alt={label} className="w-full h-full object-cover rounded-lg shadow-md" />
        <button
          onClick={handleClear}
          className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Remove image"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <label
      htmlFor={id}
      className={`relative flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
      ${isDragging ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/30' : 'border-slate-300 dark:border-slate-600 hover:border-violet-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center p-4">
        <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full mb-3">
            <UserIcon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
        </div>
        <p className="mb-2 font-semibold text-lg text-slate-700 dark:text-slate-300">{label}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
            Click to upload or drag & drop
        </p>
        <UploadIcon className="w-8 h-8 mt-4 text-slate-400 dark:text-slate-500" />
      </div>
      <input 
        id={id} 
        type="file" 
        className="hidden" 
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => handleFileChange(e.target.files)}
        ref={fileInputRef}
      />
    </label>
  );
};
