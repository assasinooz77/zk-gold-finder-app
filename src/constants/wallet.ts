// eslint-disable-next-line import/no-extraneous-dependencies
import { AbstractConnector } from '@web3-react/abstract-connector';

import { injected, walletconnect } from '../connectors';

export interface WalletInfo {
  connector: AbstractConnector;
  name: string;
  description: string;
  href: string | null;
  color: string;
  primary?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
  },
};
