/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

import { SupportedChainId } from '../constants/chains';
import { INFURA_NETWORK_URLS } from '../constants/infura';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(
    provider,
    // eslint-disable-next-line no-nested-ternary
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? // eslint-disable-next-line radix
        parseInt(provider.chainId)
      : 'any'
  );
  library.pollingInterval = 15_000;
  return library;
}

/* eslint-disable import/prefer-default-export */
export const getRpcUrls = (chainId: SupportedChainId): [string] => {
  switch (chainId) {
    case SupportedChainId.MAINNET:
    case SupportedChainId.GOERLI:
      return [INFURA_NETWORK_URLS[chainId]];
    default:
  }
  // Our API-keyed URLs will fail security checks when used with external wallets.
  throw new Error('RPC URLs must use public endpoints');
};
