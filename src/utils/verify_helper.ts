/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { utils } from 'ffjavascript';
import { plonk } from 'snarkjs';

import ABI from '../abi/Verifier.json';
import Proof from '../assets/proof.json';
import { DEFAULT_NETWORK } from '../constants/chains';
import { GOLD_HASH } from '../constants/contract';
import { getContract, getRpcUrls } from './contract';

const { stringifyBigInts } = utils;

async function exportCallDataPlonk(_proof: any, _publicSignals: any) {
  const calldata = await plonk.exportSolidityCallData(_proof, _publicSignals);

  // console.log("calldata", calldata);
  const calldataSplit = calldata.split(',');
  const [proof, ...rest] = calldataSplit;
  const publicSignals = JSON.parse(rest.join(',')).map((x: any) => BigInt(x).toString());
  return { proof, publicSignals };
}

export async function verifyByWeb3(contractAddress: string, targetX: number, targetY: number) {
  const proofStr = stringifyBigInts(Proof);
  const data1 = [1, GOLD_HASH[0], GOLD_HASH[1], targetX, targetY];
  const publicSignalsStr = stringifyBigInts(data1);

  const { proof, publicSignals } = await exportCallDataPlonk(proofStr, publicSignalsStr);

  const library = new JsonRpcProvider(getRpcUrls(DEFAULT_NETWORK)[0]) as Web3Provider;
  const contract = getContract(contractAddress, ABI, library);

  try {
    const res = await contract.verifyProof(proof, publicSignals);
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
  return false;
}
