import type { Character } from '@/lib/types';
import { AVATAR_OPTIONS } from '@/lib/constants';

export const seedCharacters: Character[] = [
  {
    id: 'seed-1',
    name: 'CosmoRon',
    skills: ['Technology', 'Flying', 'Stealth'],
    avatar: AVATAR_OPTIONS[0].src,
  },
  {
    id: 'seed-2',
    name: 'Sir Bricks-a-lot',
    skills: ['Building', 'Strength'],
    avatar: AVATAR_OPTIONS[1].src,
  },
  {
    id: 'seed-3',
    name: 'Wizbit',
    skills: ['Magic', 'Building'],
    avatar: AVATAR_OPTIONS[2].src,
  },
];
