import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { Header } from './components/Header';
import { generateWeddingImage } from './services/geminiService';
import { WeddingStyle } from './types';
import { SparklesIcon, DownloadIcon } from './components/icons';

interface UploadedImage {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

const App: React.FC = () => {
  const [manImage, setManImage] = useState<UploadedImage | null>(null);
  const [womanImage, setWomanImage] = useState<UploadedImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<WeddingStyle>(WeddingStyle.Castle);
  const [customStyle, setCustomStyle] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleGenerate = useCallback(async () => {
    if (!manImage || !womanImage) {
      setError('Please upload photos for the groom and bride.');
      return;
    }
    if (selectedStyle === WeddingStyle.Custom && !customStyle.trim()) {
      setError('Please describe your custom venue.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateWeddingImage(
        { data: manImage.base64, mimeType: manImage.mimeType },
        { data: womanImage.base64, mimeType: womanImage.mimeType },
        selectedStyle,
        customStyle
      );
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [manImage, womanImage, selectedStyle, customStyle]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'ai-wedding-photo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenModal = () => {
    if (generatedImage) setIsModalOpen(true);
  };

  const isGenerateDisabled = !manImage || !womanImage || isLoading || (selectedStyle === WeddingStyle.Custom && !customStyle.trim());

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 pb-8 max-w-7xl">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 md:p-8 rounded-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column: Inputs */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-400 mb-4 text-center lg:text-left">1- Provide a clear, front-facing photo for each person.</h2>
                <div className="grid grid-cols-2 gap-4">
                  <ImageUploader
                    id="groom-photo"
                    label="Groom"
                    onImageUpload={setManImage}
                    onClear={() => setManImage(null)}
                  />
                  <ImageUploader
                    id="bride-photo"
                    label="Bride"
                    onImageUpload={setWomanImage}
                    onClear={() => setWomanImage(null)}
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-slate-400 mb-4 text-center lg:text-left">2- Select a venue or describe your own dream location.</h2>
                <StyleSelector
                  selectedStyle={selectedStyle}
                  onStyleChange={setSelectedStyle}
                  customStyle={customStyle}
                  onCustomStyleChange={setCustomStyle}
                />
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerateDisabled}
                  className="px-12 py-3 bg-violet-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-violet-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Right Column: Output */}
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold text-slate-400 mb-4 text-center lg:text-left">3- Your wedding picture</h2>
              <div className="flex-grow min-h-[400px] lg:min-h-0 w-full aspect-[4/5] bg-slate-900/50 rounded-lg flex items-center justify-center overflow-hidden">
                <GeneratedImageDisplay
                  isLoading={isLoading}
                  error={error}
                  imageUrl={generatedImage}
                  onImageClick={handleOpenModal}
                />
              </div>
              {generatedImage && !isLoading && !error && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerateDisabled}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-500 disabled:bg-slate-500 disabled:cursor-not-allowed"
                  >
                    <SparklesIcon className="w-5 h-5" />
                    Regenerate
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                  >
                    <DownloadIcon className="w-5 h-5" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && generatedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={generatedImage}
            alt="Zoomed wedding"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl animate-zoom-in"
          />
        </div>
      )}
    </div>
  );
};

export default App;