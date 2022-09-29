/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import path from 'path';
import { plonk } from 'snarkjs';

import ABI from '../abi/Verifier.json';
import { DEFAULT_NETWORK } from '../constants/chains';
import { GOLD_HASH } from '../constants/contract';
import { getContract, getRpcUrls } from './contract';

async function exportCallDataPlonk(input: any, wasmPath: string, zkeyPath: string) {
  console.log(wasmPath, zkeyPath);
  const { proof: _proof, publicSignals: _publicSignals } = await plonk.fullProve(input, wasmPath, zkeyPath);
  const calldata = await plonk.exportSolidityCallData(_proof, _publicSignals);

  // console.log("calldata", calldata);
  const calldataSplit = calldata.split(',');
  const [proof, ...rest] = calldataSplit;
  const publicSignals = JSON.parse(rest.join(',')).map((x: any) => BigInt(x).toString());
  return { proof, publicSignals };
}

export async function verifyByWeb3(contractAddress: string, targetX: number, targetY: number) {
  const { proof, publicSignals } = await exportCallDataPlonk(
    { goldX: targetX, goldY: targetY, goldHash: GOLD_HASH, targetX, targetY },
    path.join(__dirname, 'src', 'assets', 'circuit.wasm'),
    path.join(__dirname, 'src', 'assets', 'circuit_final.zkey')
  );

  const library = new JsonRpcProvider(getRpcUrls(DEFAULT_NETWORK)[0]) as Web3Provider;
  const contract = getContract(contractAddress, ABI, library);

  try {
    const res = await contract.verifyProof(proof, publicSignals);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
