export enum WeddingStyle {
  Castle = 'Castle Ballroom',
  Beach = 'Beach',
  Garden = 'Garden',
  Hotel = 'Luxury Hotel',
  Boho = 'Boho Outdoor',
  Custom = 'Custom Venue',
}

export interface StyleOption {
  id: WeddingStyle;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface UploadedImageFile {
  base64: string;
  mimeType: string;
  previewUrl: string;
}