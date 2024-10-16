import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ArticleFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const articleFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultMetadata',
    outputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'image', internalType: 'string', type: 'string' },
      { name: 'externalUrl', internalType: 'string', type: 'string' },
      { name: 'date', internalType: 'string', type: 'string' },
      { name: 'attributes', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDefaultMetadataAsArray',
    outputs: [
      { name: 'keys', internalType: 'string[]', type: 'string[]' },
      { name: 'values', internalType: 'string[]', type: 'string[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'userMetadata',
        internalType: 'struct TokenURIStorage.KeyValuePair[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'mergeMetadata',
    outputs: [
      {
        name: '',
        internalType: 'struct TokenURIStorage.KeyValuePair[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      {
        name: 'userMetadata',
        internalType: 'struct TokenURIStorage.KeyValuePair[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenHistory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURIContracts',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'viewTokenHistory',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const factoryAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'erc721Address',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UserRegistered',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserERC721Address',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nftName', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'userAddresses',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'users',
    outputs: [
      { name: 'userAddress', internalType: 'address', type: 'address' },
      { name: 'erc721Address', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
] as const

/**
 *
 */
export const factoryAddress = {
  31337: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
} as const

/**
 *
 */
export const factoryConfig = {
  address: factoryAddress,
  abi: factoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__
 */
export const readArticleFactory = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readArticleFactoryBalanceOf = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"defaultMetadata"`
 */
export const readArticleFactoryDefaultMetadata =
  /*#__PURE__*/ createReadContract({
    abi: articleFactoryAbi,
    functionName: 'defaultMetadata',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"getApproved"`
 */
export const readArticleFactoryGetApproved = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"getDefaultMetadataAsArray"`
 */
export const readArticleFactoryGetDefaultMetadataAsArray =
  /*#__PURE__*/ createReadContract({
    abi: articleFactoryAbi,
    functionName: 'getDefaultMetadataAsArray',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readArticleFactoryIsApprovedForAll =
  /*#__PURE__*/ createReadContract({
    abi: articleFactoryAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"mergeMetadata"`
 */
export const readArticleFactoryMergeMetadata = /*#__PURE__*/ createReadContract(
  { abi: articleFactoryAbi, functionName: 'mergeMetadata' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"name"`
 */
export const readArticleFactoryName = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const readArticleFactoryOwner = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readArticleFactoryOwnerOf = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readArticleFactorySupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: articleFactoryAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"symbol"`
 */
export const readArticleFactorySymbol = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"tokenHistory"`
 */
export const readArticleFactoryTokenHistory = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
  functionName: 'tokenHistory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readArticleFactoryTokenUri = /*#__PURE__*/ createReadContract({
  abi: articleFactoryAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"tokenURIContracts"`
 */
export const readArticleFactoryTokenUriContracts =
  /*#__PURE__*/ createReadContract({
    abi: articleFactoryAbi,
    functionName: 'tokenURIContracts',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"viewTokenHistory"`
 */
export const readArticleFactoryViewTokenHistory =
  /*#__PURE__*/ createReadContract({
    abi: articleFactoryAbi,
    functionName: 'viewTokenHistory',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleFactoryAbi}__
 */
export const writeArticleFactory = /*#__PURE__*/ createWriteContract({
  abi: articleFactoryAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"approve"`
 */
export const writeArticleFactoryApprove = /*#__PURE__*/ createWriteContract({
  abi: articleFactoryAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"mint"`
 */
export const writeArticleFactoryMint = /*#__PURE__*/ createWriteContract({
  abi: articleFactoryAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeArticleFactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: articleFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeArticleFactorySafeTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: articleFactoryAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeArticleFactorySetApprovalForAll =
  /*#__PURE__*/ createWriteContract({
    abi: articleFactoryAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeArticleFactoryTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: articleFactoryAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeArticleFactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: articleFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleFactoryAbi}__
 */
export const simulateArticleFactory = /*#__PURE__*/ createSimulateContract({
  abi: articleFactoryAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"approve"`
 */
export const simulateArticleFactoryApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"mint"`
 */
export const simulateArticleFactoryMint = /*#__PURE__*/ createSimulateContract({
  abi: articleFactoryAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateArticleFactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateArticleFactorySafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateArticleFactorySetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateArticleFactoryTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateArticleFactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__
 */
export const watchArticleFactoryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: articleFactoryAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__ and `eventName` set to `"Approval"`
 */
export const watchArticleFactoryApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: articleFactoryAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchArticleFactoryApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: articleFactoryAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchArticleFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: articleFactoryAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchArticleFactoryTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: articleFactoryAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__
 *
 *
 */
export const readFactory = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"getUserERC721Address"`
 *
 *
 */
export const readFactoryGetUserErc721Address = /*#__PURE__*/ createReadContract(
  {
    abi: factoryAbi,
    address: factoryAddress,
    functionName: 'getUserERC721Address',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"userAddresses"`
 *
 *
 */
export const readFactoryUserAddresses = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'userAddresses',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"users"`
 *
 *
 */
export const readFactoryUsers = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'users',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link factoryAbi}__
 *
 *
 */
export const writeFactory = /*#__PURE__*/ createWriteContract({
  abi: factoryAbi,
  address: factoryAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"register"`
 *
 *
 */
export const writeFactoryRegister = /*#__PURE__*/ createWriteContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link factoryAbi}__
 *
 *
 */
export const simulateFactory = /*#__PURE__*/ createSimulateContract({
  abi: factoryAbi,
  address: factoryAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"register"`
 *
 *
 */
export const simulateFactoryRegister = /*#__PURE__*/ createSimulateContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link factoryAbi}__
 *
 *
 */
export const watchFactoryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: factoryAbi,
  address: factoryAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link factoryAbi}__ and `eventName` set to `"UserRegistered"`
 *
 *
 */
export const watchFactoryUserRegisteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: factoryAbi,
    address: factoryAddress,
    eventName: 'UserRegistered',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__
 */
export const useReadArticleFactory = /*#__PURE__*/ createUseReadContract({
  abi: articleFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadArticleFactoryBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"defaultMetadata"`
 */
export const useReadArticleFactoryDefaultMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'defaultMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadArticleFactoryGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"getDefaultMetadataAsArray"`
 */
export const useReadArticleFactoryGetDefaultMetadataAsArray =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'getDefaultMetadataAsArray',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadArticleFactoryIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"mergeMetadata"`
 */
export const useReadArticleFactoryMergeMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'mergeMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"name"`
 */
export const useReadArticleFactoryName = /*#__PURE__*/ createUseReadContract({
  abi: articleFactoryAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadArticleFactoryOwner = /*#__PURE__*/ createUseReadContract({
  abi: articleFactoryAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadArticleFactoryOwnerOf = /*#__PURE__*/ createUseReadContract(
  { abi: articleFactoryAbi, functionName: 'ownerOf' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadArticleFactorySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadArticleFactorySymbol = /*#__PURE__*/ createUseReadContract({
  abi: articleFactoryAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"tokenHistory"`
 */
export const useReadArticleFactoryTokenHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'tokenHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadArticleFactoryTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"tokenURIContracts"`
 */
export const useReadArticleFactoryTokenUriContracts =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'tokenURIContracts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"viewTokenHistory"`
 */
export const useReadArticleFactoryViewTokenHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: articleFactoryAbi,
    functionName: 'viewTokenHistory',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleFactoryAbi}__
 */
export const useWriteArticleFactory = /*#__PURE__*/ createUseWriteContract({
  abi: articleFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteArticleFactoryApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: articleFactoryAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteArticleFactoryMint = /*#__PURE__*/ createUseWriteContract({
  abi: articleFactoryAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteArticleFactoryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: articleFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteArticleFactorySafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: articleFactoryAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteArticleFactorySetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: articleFactoryAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteArticleFactoryTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: articleFactoryAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteArticleFactoryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: articleFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleFactoryAbi}__
 */
export const useSimulateArticleFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: articleFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateArticleFactoryApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateArticleFactoryMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateArticleFactoryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateArticleFactorySafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateArticleFactorySetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateArticleFactoryTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateArticleFactoryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__
 */
export const useWatchArticleFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: articleFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchArticleFactoryApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: articleFactoryAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchArticleFactoryApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: articleFactoryAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchArticleFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: articleFactoryAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link articleFactoryAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchArticleFactoryTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: articleFactoryAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__
 *
 *
 */
export const useReadFactory = /*#__PURE__*/ createUseReadContract({
  abi: factoryAbi,
  address: factoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"getUserERC721Address"`
 *
 *
 */
export const useReadFactoryGetUserErc721Address =
  /*#__PURE__*/ createUseReadContract({
    abi: factoryAbi,
    address: factoryAddress,
    functionName: 'getUserERC721Address',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"userAddresses"`
 *
 *
 */
export const useReadFactoryUserAddresses = /*#__PURE__*/ createUseReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'userAddresses',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"users"`
 *
 *
 */
export const useReadFactoryUsers = /*#__PURE__*/ createUseReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'users',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link factoryAbi}__
 *
 *
 */
export const useWriteFactory = /*#__PURE__*/ createUseWriteContract({
  abi: factoryAbi,
  address: factoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"register"`
 *
 *
 */
export const useWriteFactoryRegister = /*#__PURE__*/ createUseWriteContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link factoryAbi}__
 *
 *
 */
export const useSimulateFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: factoryAbi,
  address: factoryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"register"`
 *
 *
 */
export const useSimulateFactoryRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: factoryAbi,
    address: factoryAddress,
    functionName: 'register',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link factoryAbi}__
 *
 *
 */
export const useWatchFactoryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: factoryAbi,
  address: factoryAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link factoryAbi}__ and `eventName` set to `"UserRegistered"`
 *
 *
 */
export const useWatchFactoryUserRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: factoryAbi,
    address: factoryAddress,
    eventName: 'UserRegistered',
  })
