import fs from 'node:fs';
import path from 'node:path';
import { Constants } from '../../src/lib/constants.js';
import { type Constants as ConstantsType } from '../models/types.mjs';

export const TestConstants: ConstantsType = Object.freeze({
  cliPromptMsDelay: 200,
  minaGraphQlPort: 8080,
  minaAccountsManagerPort: 8181,
  mockedEndpointsServicePort: 8282,
  skipInteractiveSelectionOptions: [false, true],
  feePayerMgmtTypes: ['recover', 'new', 'cached'],
  feePayerTmpCacheDir: path.join(
    path.dirname(Constants.feePayerCacheDir),
    '_keys'
  ),
  recentBlocks: 25,
  specialCliKeys: [
    'arrowDown',
    'arrowLeft',
    'arrowRight',
    'arrowUp',
    'backSpace',
    'delete',
    'end',
    'enter',
    'escape',
    'home',
    'pageUp',
    'pageDown',
    'space',
    'tab',
    'ctrlc',
  ],
  defaultProjectConfig: {
    version: 1,
    deployAliases: {},
  },
  syncStatusGraphQlResponse: {
    data: {
      syncStatus: 'SYNCED',
    },
  },
  nonceFetchingGraphQlResponse: {
    data: {
      account: {
        nonce: '999',
      },
    },
  },
  getAccountDetailsFetchingGraphQlResponse: (publicKey: string) => {
    return {
      data: {
        account: {
          publicKey,
          nonce: '999',
          balance: { total: '999' },
          delegateAccount: {
            publicKey,
          },
          zkappState: ['2', '0', '0', '0', '0', '0', '0', '0'],
          verificationKey: {
            verificationKey: 'mockedVerificationKey',
            hash: 'mockedVerificationKeyHash',
          },
        },
      },
    };
  },
  zkAppTransactionGraphQlResponse: {
    data: {
      sendZkapp: {
        zkapp: {
          id: '1234567890',
          hash: '5Ju6e5WfkVhdp1PAVhAJoLxqgWZT17FVkFaTnU6XvPkGwUHdDvqC',
          failureReason: null,
        },
      },
    },
  },
  mempoolGraphQlResponse: {
    data: { pooledUserCommands: [], pooledZkappCommands: [] },
  },
  accounts: [
    {
      pk: 'B62qq1miZzh8QMumJ2dhJSvPxdeShGQ2G2cH4YXwxNLpPSvKdRVTb3q',
      sk: 'EKEnVLUhYHDJvgmgQu5SzaV8MWKNfhAXYSkLBRk5KEfudWZRbs4P',
    },
    {
      pk: 'B62qq6f3enRpmGsWBaJMstwQjQiRdAnyAZ6CbKrcJFgFidRnWZyJkje',
      sk: 'EKEXS3qUZRhxDzExtuAaQVHtxLzt8A3fqS7o7iL9NpvdATsshvB6',
    },
    {
      pk: 'B62qkBw74e5D3yZLAFTCK3yktG4TZtq4wSfjPrxKr9Psxu29oEZWpvw',
      sk: 'EKF3qRhoze6r6bgF5uRmhMkEahfZJHHQ3hzxqCbPvaNzdhxMVCQh',
    },
    {
      pk: 'B62qrDMuC4Vu3x6Kcr6YpBYsFsrshpyyH6MWX4cs5UNN2b9syT3rHNX',
      sk: 'EKFd1GxnQ53H3shreTB2VzQJxECz9DE9NjorrkfKyEuKCsHDHVSE',
    },
    {
      pk: 'B62qo2C5mvFGtmTdHVAynh2ZgD3kG6QbN6pMqnoCYsaFyCsxHuskFVe',
      sk: 'EKFTtvEvxDbMLGfmktofYT1Art7imjTQjUctvpuzbD5bzm9PxHrG',
    },
    {
      pk: 'B62qmYHbjp4oDCNRNgHf1YLPQWQkVZ49Q6DLXmA9UdoERa9q29piAAo',
      sk: 'EKEHLiY4THpcrHaKNqj9yPCCS9gBFCF5P2ZQSULeAyjUZRyDXV2Z',
    },
    {
      pk: 'B62qiYg67MzbxgsHv9EPxANUk9EyKWLdPFVc6sdvECF2ktZoguHRRbg',
      sk: 'EKDpKJFP7UYUgFDxDQX8mprMtoFJHorK8dQfT6c1RmyCJLVDgFnB',
    },
    {
      pk: 'B62qmKLqCjz7j4Wj1yodmsr9xDtGaiMz538NMY39D9dpukZJtEmsSFr',
      sk: 'EKEKGDyC13jpwTacYGbpr6nvhaifmMss5cEuYXYHyxYCoD656Cff',
    },
    {
      pk: 'B62qoY1SU63CQR2kyU3ra38s9AD66hyLsxRx91gkpEm3Y9sUcer5x5k',
      sk: 'EKFT7AEhreTdud8prVgfvrGnXd8W45mVftwSPmm4o4okQDLN9Eei',
    },
    {
      pk: 'B62qkEdNmGbUVaUnVtwMeMo9G1QBgfp9c3K7j4FbmXn21zG8ssvaPvi',
      sk: 'EKEJru1CaxwBKMZZzoKEpD1HPCF77htS2VgqoVz6dBaCRoTtmFCy',
    },
  ],
  getMempoolTxnsQuery: `{
    pooledUserCommands {
      hash
      failureReason
    }
    pooledZkappCommands {
      hash
      failureReason {
        failures
        index
      }
    }
  }`,
  getAccountDetailsQuery: (publicKey: string) => {
    return `{
      account(publicKey: "${publicKey}") {
        balance {
          blockHeight
          total
          locked
          liquid
          unknown
        }
        zkappState
        verificationKey {
          verificationKey
        }
      }
    }`;
  },
  getRecentBlocksQuery: (maxLength = TestConstants.recentBlocks) => {
    return `{
      bestChain(maxLength: ${maxLength}) {
        protocolState {
          consensusState {
            blockHeight
            epoch
            slot
            slotSinceGenesis
          }
          previousStateHash
          blockchainState {
            date
          }
        }
        commandTransactionCount
        stateHash
        transactions {
          userCommands {
            hash
            failureReason
          }
          zkappCommands {
            hash
            failureReason {
              failures
              index
            }
          }
        }
      }
    }`;
  },
});

export function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getBooleanFromString(target: string) {
  return target?.trim() === 'true';
}

export function getArrayValuesAsString(array: string[]) {
  return JSON.stringify(array)
    .replaceAll(',', ', ')
    .replace(/[[|\]]/g, '');
}

export function isEmptyDir(path: string) {
  try {
    const directory = fs.opendirSync(path);
    const entry = directory.readSync();
    directory.closeSync();

    return entry === null;
  } catch (error) {
    return false;
  }
}

export function feePayerCacheExists() {
  return (
    fs.existsSync(Constants.feePayerCacheDir) &&
    !isEmptyDir(Constants.feePayerCacheDir)
  );
}

export function listCachedFeePayerAliases() {
  if (feePayerCacheExists()) {
    let aliases = fs.readdirSync(Constants.feePayerCacheDir);

    aliases = aliases
      .filter((fileName) => fileName.endsWith('.json'))
      .map((name) => name.slice(0, -5));

    return aliases;
  } else {
    return [];
  }
}

export function cleanupFeePayerCache() {
  if (feePayerCacheExists()) {
    console.info(
      `Cleaning up the fee payer cache directory: ${Constants.feePayerCacheDir}`
    );
    fs.rmSync(TestConstants.feePayerTmpCacheDir, {
      force: true,
      recursive: true,
    });
    fs.renameSync(
      Constants.feePayerCacheDir,
      TestConstants.feePayerTmpCacheDir
    );
  }
}

export function cleanupFeePayerCacheByAlias(alias: string) {
  console.info(`Cleaning up the fee payer cache for alias: ${alias}`);
  fs.rmSync(
    `${Constants.feePayerCacheDir}/${alias.trim().replace(/\s+/g, '-')}.json`,
    { force: true }
  );
}

export function restoreFeePayerCache() {
  if (
    fs.existsSync(TestConstants.feePayerTmpCacheDir) &&
    !isEmptyDir(TestConstants.feePayerTmpCacheDir)
  ) {
    fs.rmSync(Constants.feePayerCacheDir, { force: true, recursive: true });
    fs.renameSync(
      TestConstants.feePayerTmpCacheDir,
      Constants.feePayerCacheDir
    );
  }
}

export function getZkAppAccountFromAlias(
  workDir: string,
  deploymentAlias: string
) {
  const sanitizedDeploymentAlias = deploymentAlias.trim().replace(/\s+/g, '-');
  const zkAppKeyPath = JSON.parse(
    fs.readFileSync(`${workDir}/config.json`, 'utf8')
  ).deployAliases[sanitizedDeploymentAlias].keyPath;
  const zkAppAccount = JSON.parse(
    fs.readFileSync(`${workDir}/${zkAppKeyPath}`, 'utf8')
  );

  return zkAppAccount;
}

export function getZkAppSmartContractNameFromAlias(
  workDir: string,
  deploymentAlias: string
) {
  const sanitizedDeploymentAlias = deploymentAlias.trim().replace(/\s+/g, '-');
  const smartContract = JSON.parse(
    fs.readFileSync(`${workDir}/config.json`, 'utf8')
  ).deployAliases[sanitizedDeploymentAlias].smartContract;

  return smartContract;
}
