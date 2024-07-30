import type { TContractType } from '@defibuilder/sdk';
import type { LucideIcon } from 'lucide-react';

import { BadgeCent, BookHeart, Brush, Dices, HandCoins, Landmark } from 'lucide-react';

import {
  predefinedDAOPrompts,
  predefinedEditionPrompts,
  predefinedMinigamePrompts,
  predefinedNftPrompts,
  predefinedRevenueSharePrompts,
  predefinedTokenPrompts,
  TPrompt
} from './prompt';

export type TTemplate = {
  name: TContractType;
  icon: LucideIcon;
  predefinedPrompts: TPrompt[];
  description: string;
};

export const templates: TTemplate[] = [
  {
    name: 'Token',
    icon: BadgeCent,
    predefinedPrompts: predefinedTokenPrompts,
    description: 'Create a ERC20 token contract'
  },
  {
    name: 'NFT',
    icon: Brush,
    predefinedPrompts: predefinedNftPrompts,
    description: 'Create a ERC721 token contract'
  },
  {
    name: 'Edition',
    icon: BookHeart,
    predefinedPrompts: predefinedEditionPrompts,
    description: 'Create a ERC1155 token contract'
  },
  {
    name: 'Revenue Share',
    icon: HandCoins,
    predefinedPrompts: predefinedRevenueSharePrompts,
    description: 'Create a Revenue Share contract'
  },
  {
    name: 'Minigame',
    icon: Dices,
    predefinedPrompts: predefinedMinigamePrompts,
    description: 'Create a Minigame contract'
  },
  {
    name: 'DAO',
    icon: Landmark,
    predefinedPrompts: predefinedDAOPrompts,
    description: 'Create a DAO contract'
  }
];
