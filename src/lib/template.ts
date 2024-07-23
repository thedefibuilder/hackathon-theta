import type { TContractType } from '@defibuilder/sdk';
import type { LucideIcon } from 'lucide-react';
import type TPrompt from './prompt';

type TTemplate = {
  name: TContractType;
  icon: LucideIcon;
  predefinedPrompts: TPrompt[];
  description: string;
};

export default TTemplate;
