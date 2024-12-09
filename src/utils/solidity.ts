import * as solc from 'solc-js';
import type { ContractData } from '../types';

export async function compileSolidity(source: string): Promise<ContractData> {
  const input = {
    language: 'Solidity',
    sources: {
      'input.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'devdoc', 'userdoc']
        }
      }
    }
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contractName = Object.keys(output.contracts['input.sol'])[0];
  const { abi, devdoc, userdoc } = output.contracts['input.sol'][contractName];

  return {
    abi,
    natspec: {
      devdoc,
      userdoc
    }
  };
}