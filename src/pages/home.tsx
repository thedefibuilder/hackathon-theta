import { Suspense, useState } from 'react';

import stepBackground from '@/assets/images/step.svg';
import BorderedContainer from '@/components/bordered-container';
import ChainSelectSection from '@/components/sections/chains';
import SuspenseFallback from '@/components/suspense-fallback';
import { chains } from '@/lib/chains';

export default function HomePage() {
  const [activeChain, setActiveChain] = useState(chains[0]);

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
    </div>
  );
}
