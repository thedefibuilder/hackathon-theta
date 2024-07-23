import type { Chain } from 'wagmi/chains';

import { defineChain } from 'viem';

type TChain = {
  name: string;
  logo: string;
  network: Chain;
};

export default TChain;

export const theta = defineChain({
  id: 361,
  name: 'Theta Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Theta Fuel',
    symbol: 'TFUEL'
  },
  rpcUrls: {
    default: {
      http: ['https://eth-rpc-api.thetatoken.org/rpc']
    }
  },
  blockExplorers: {
    default: { name: 'Theta Explorer', url: 'https://explorer.thetatoken.org' }
  }
});

export const thetaTestnet = defineChain({
  id: 365,
  name: 'Theta Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Theta Fuel',
    symbol: 'TFUEL'
  },
  rpcUrls: {
    default: {
      http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc']
    }
  },
  blockExplorers: {
    default: { name: 'Theta Explorer', url: 'https://testnet-explorer.thetatoken.org' }
  }
});

export const chains: TChain[] = [
  {
    name: 'Theta Mainnet',
    logo: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png',
    network: theta
  },
  {
    name: 'Theta Testnet',
    logo: 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png',
    network: thetaTestnet
  }
];
