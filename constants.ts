import { StyleOption, WeddingStyle } from './types';
import { PencilIcon, CastleIcon, SunIcon, FlowerIcon, BuildingIcon, LeafIcon } from './components/icons';

export const WEDDING_STYLES: StyleOption[] = [
  {
    id: WeddingStyle.Castle,
    name: 'Castle Ballroom',
    description: 'An elegant hall with chandeliers.',
    icon: CastleIcon,
  },
  {
    id: WeddingStyle.Beach,
    name: 'Beach',
    description: 'Sandy shore at golden hour.',
    icon: SunIcon,
  },
  {
    id: WeddingStyle.Garden,
    name: 'Garden',
    description: 'Lush greenery and florals.',
    icon: FlowerIcon,
  },
  {
    id: WeddingStyle.Hotel,
    name: 'Luxury Hotel',
    description: 'Modern, classy interiors.',
    icon: BuildingIcon,
  },
  {
    id: WeddingStyle.Boho,
    name: 'Boho Outdoor',
    description: 'Meadow or forest with soft light.',
    icon: LeafIcon,
  },
  {
    id: WeddingStyle.Custom,
    name: 'Custom Venue',
    description: 'Describe your own dream place.',
    icon: PencilIcon,
  },
];