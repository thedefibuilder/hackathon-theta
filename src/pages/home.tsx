import { Suspense, useState } from 'react';

import stepBackground from '@/assets/images/step.svg';
import BorderedContainer from '@/components/bordered-container';
import ChainSelectSection from '@/components/sections/chains';
import PromptSection from '@/components/sections/prompt/prompt-section';
import TemplatesSection from '@/components/sections/templates';
import SuspenseFallback from '@/components/suspense-fallback';
import { chains } from '@/lib/chains';
import TCreationStep from '@/lib/creation-step';
import useContractWorkflow from '@/lib/hooks/use-contract-workflow';
import { templates, TTemplate } from '@/lib/template';

export default function HomePage() {
  const [activeChain, setActiveChain] = useState(chains[0]);
  const [activeTemplate, setActiveTemplate] = useState(templates[0]);
  const [userPrompt, setUserPrompt] = useState('');

  const {
    isGenerating,
    isGenerationError,
    isGenerationSuccess,
    contractCode,
    isCompiling,
    isCompilationError,
    isCompilationSuccess,
    contractArtifact,
    isAuditing,
    isAuditionError,
    isAuditionSuccess,
    audit,
    initContractWorkflow
  } = useContractWorkflow();

  const isContractWorkflowLoading = isGenerating || isCompiling || isAuditing;

  const isContractWorkflowCompleted =
    (isGenerationError || isGenerationSuccess) &&
    (isCompilationError || isCompilationSuccess) &&
    (isAuditionError || isAuditionSuccess);

  const creationSteps: TCreationStep[] = [
    {
      number: 1,
      step: 'Generating',
      isLoading: isGenerating,
      isError: isGenerationError,
      isSuccess: isGenerationSuccess,
      isStepConnected: true
    },
    {
      number: 2,
      step: 'Compiling',
      isLoading: isCompiling,
      isError: isCompilationError,
      isSuccess: isCompilationSuccess,
      isStepConnected: true
    },
    {
      number: 3,
      step: 'Auditing',
      isLoading: isAuditing,
      isError: isAuditionError,
      isSuccess: isAuditionSuccess,
      isStepConnected: true
    },
    {
      number: 4,
      step: 'Completed',
      isLoading: false,
      isError: isGenerationError && isCompilationError && isAuditionError,
      isSuccess: isContractWorkflowCompleted,
      isStepConnected: false
    }
  ];

  return (
    <div className='flex w-full max-w-[1140px] flex-col gap-y-5'>
      <BorderedContainer
        className='bg-cover md:mt-16 md:bg-contain'
        style={{
          background: `url(${stepBackground}) no-repeat`
        }}
      >
        <Suspense fallback={<SuspenseFallback className='h-40' />}>
          <ChainSelectSection
            chains={chains}
            activeChain={activeChain}
            setActiveChain={setActiveChain}
          />
        </Suspense>
      </BorderedContainer>

      <BorderedContainer>
        <Suspense fallback={<SuspenseFallback />}>
          <TemplatesSection
            templates={templates}
            activeTemplateName={activeTemplate.name}
            onActiveTemplateChange={(template: TTemplate) => {
              setUserPrompt('');
              setActiveTemplate(template);
            }}
            isDisabled={isContractWorkflowLoading}
          />
        </Suspense>

        <Suspense fallback={<SuspenseFallback />}>
          <PromptSection
            activeChainName={activeChain.name}
            predefinedPrompts={activeTemplate.predefinedPrompts}
            userPrompt={userPrompt}
            isGenerationLoading={isContractWorkflowLoading}
            creationSteps={creationSteps}
            setUserPrompt={setUserPrompt}
            onGenerateClick={() => initContractWorkflow(userPrompt, activeTemplate.name)}
          />
        </Suspense>
      </BorderedContainer>
    </div>
  );
}
