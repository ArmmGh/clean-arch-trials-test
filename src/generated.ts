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
// Article
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const articleAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_channel', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'channel',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'generateMetadata',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_version', internalType: 'uint256', type: 'uint256' }],
    name: 'getMetadataHistory',
    outputs: [
      {
        name: '',
        internalType: 'struct Article.KeyValuePair[]',
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
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'metadataHistory',
    outputs: [
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'metadata',
        internalType: 'struct Article.KeyValuePair[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'storeKeyValuePairs',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newMetadata',
        internalType: 'struct Article.KeyValuePair[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'updateMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Channel
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const channelAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_metadataAttributes', internalType: 'address', type: 'address' },
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
        name: '_articleID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_articleAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ArticleCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_articleID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ArticleEdited',
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
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'articleHistory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'articleIDs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'articles',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
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
    inputs: [
      { name: 'articleID', internalType: 'uint256', type: 'uint256' },
      {
        name: 'newMetadata',
        internalType: 'struct Article.KeyValuePair[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'editArticle',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'struct Article.KeyValuePair[]',
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
        internalType: 'struct Article.KeyValuePair[]',
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
    inputs: [],
    name: 'metadataAttributes',
    outputs: [
      {
        name: '',
        internalType: 'contract IMetadataAttributes',
        type: 'address',
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
        internalType: 'struct Article.KeyValuePair[]',
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [{ name: 'articleID', internalType: 'uint256', type: 'uint256' }],
    name: 'viewArticleHistory',
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
    type: 'constructor',
    inputs: [
      { name: '_metadataAttributes', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'publisher',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'channel',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PublisherRegistered',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'channels',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllChannels',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_publisher', internalType: 'address', type: 'address' }],
    name: 'getChannels',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'metadataAttributes',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'publisherToChannels',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'publishers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_channelName', internalType: 'string', type: 'string' },
      { name: '_channelDescription', internalType: 'string', type: 'string' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const factoryAddress = {
  31337: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
} as const

/**
 *
 */
export const factoryConfig = {
  address: factoryAddress,
  abi: factoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MetadataAttributes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const metadataAttributesAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
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
    ],
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
] as const

/**
 *
 */
export const metadataAttributesAddress = {
  31337: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
} as const

/**
 *
 */
export const metadataAttributesConfig = {
  address: metadataAttributesAddress,
  abi: metadataAttributesAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleAbi}__
 */
export const readArticle = /*#__PURE__*/ createReadContract({ abi: articleAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"channel"`
 */
export const readArticleChannel = /*#__PURE__*/ createReadContract({
  abi: articleAbi,
  functionName: 'channel',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"generateMetadata"`
 */
export const readArticleGenerateMetadata = /*#__PURE__*/ createReadContract({
  abi: articleAbi,
  functionName: 'generateMetadata',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"getMetadataHistory"`
 */
export const readArticleGetMetadataHistory = /*#__PURE__*/ createReadContract({
  abi: articleAbi,
  functionName: 'getMetadataHistory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"metadataHistory"`
 */
export const readArticleMetadataHistory = /*#__PURE__*/ createReadContract({
  abi: articleAbi,
  functionName: 'metadataHistory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"version"`
 */
export const readArticleVersion = /*#__PURE__*/ createReadContract({
  abi: articleAbi,
  functionName: 'version',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleAbi}__
 */
export const writeArticle = /*#__PURE__*/ createWriteContract({
  abi: articleAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"storeKeyValuePairs"`
 */
export const writeArticleStoreKeyValuePairs = /*#__PURE__*/ createWriteContract(
  { abi: articleAbi, functionName: 'storeKeyValuePairs' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const writeArticleUpdateMetadata = /*#__PURE__*/ createWriteContract({
  abi: articleAbi,
  functionName: 'updateMetadata',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleAbi}__
 */
export const simulateArticle = /*#__PURE__*/ createSimulateContract({
  abi: articleAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"storeKeyValuePairs"`
 */
export const simulateArticleStoreKeyValuePairs =
  /*#__PURE__*/ createSimulateContract({
    abi: articleAbi,
    functionName: 'storeKeyValuePairs',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const simulateArticleUpdateMetadata =
  /*#__PURE__*/ createSimulateContract({
    abi: articleAbi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__
 */
export const readChannel = /*#__PURE__*/ createReadContract({ abi: channelAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"articleHistory"`
 */
export const readChannelArticleHistory = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'articleHistory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"articleIDs"`
 */
export const readChannelArticleIDs = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'articleIDs',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"articles"`
 */
export const readChannelArticles = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'articles',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readChannelBalanceOf = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"getApproved"`
 */
export const readChannelGetApproved = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readChannelIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"mergeMetadata"`
 */
export const readChannelMergeMetadata = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'mergeMetadata',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"metadataAttributes"`
 */
export const readChannelMetadataAttributes = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'metadataAttributes',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"name"`
 */
export const readChannelName = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"owner"`
 */
export const readChannelOwner = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readChannelOwnerOf = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readChannelSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"symbol"`
 */
export const readChannelSymbol = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readChannelTokenUri = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"viewArticleHistory"`
 */
export const readChannelViewArticleHistory = /*#__PURE__*/ createReadContract({
  abi: channelAbi,
  functionName: 'viewArticleHistory',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__
 */
export const writeChannel = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"approve"`
 */
export const writeChannelApprove = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"editArticle"`
 */
export const writeChannelEditArticle = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
  functionName: 'editArticle',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"mint"`
 */
export const writeChannelMint = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeChannelRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeChannelSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeChannelSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeChannelTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeChannelTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: channelAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__
 */
export const simulateChannel = /*#__PURE__*/ createSimulateContract({
  abi: channelAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"approve"`
 */
export const simulateChannelApprove = /*#__PURE__*/ createSimulateContract({
  abi: channelAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"editArticle"`
 */
export const simulateChannelEditArticle = /*#__PURE__*/ createSimulateContract({
  abi: channelAbi,
  functionName: 'editArticle',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"mint"`
 */
export const simulateChannelMint = /*#__PURE__*/ createSimulateContract({
  abi: channelAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateChannelRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: channelAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateChannelSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: channelAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateChannelSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: channelAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateChannelTransferFrom = /*#__PURE__*/ createSimulateContract(
  { abi: channelAbi, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateChannelTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: channelAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link channelAbi}__
 */
export const watchChannelEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: channelAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"Approval"`
 */
export const watchChannelApprovalEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: channelAbi, eventName: 'Approval' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchChannelApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: channelAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"ArticleCreated"`
 */
export const watchChannelArticleCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: channelAbi,
    eventName: 'ArticleCreated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"ArticleEdited"`
 */
export const watchChannelArticleEditedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: channelAbi,
    eventName: 'ArticleEdited',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchChannelOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: channelAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchChannelTransferEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: channelAbi, eventName: 'Transfer' },
)

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
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"channels"`
 *
 *
 */
export const readFactoryChannels = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'channels',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"getAllChannels"`
 *
 *
 */
export const readFactoryGetAllChannels = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'getAllChannels',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"getChannels"`
 *
 *
 */
export const readFactoryGetChannels = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'getChannels',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"metadataAttributes"`
 *
 *
 */
export const readFactoryMetadataAttributes = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'metadataAttributes',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"publisherToChannels"`
 *
 *
 */
export const readFactoryPublisherToChannels = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'publisherToChannels',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"publishers"`
 *
 *
 */
export const readFactoryPublishers = /*#__PURE__*/ createReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'publishers',
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
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link factoryAbi}__ and `eventName` set to `"PublisherRegistered"`
 *
 *
 */
export const watchFactoryPublisherRegisteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: factoryAbi,
    address: factoryAddress,
    eventName: 'PublisherRegistered',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link metadataAttributesAbi}__
 *
 *
 */
export const readMetadataAttributes = /*#__PURE__*/ createReadContract({
  abi: metadataAttributesAbi,
  address: metadataAttributesAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link metadataAttributesAbi}__ and `functionName` set to `"defaultMetadata"`
 *
 *
 */
export const readMetadataAttributesDefaultMetadata =
  /*#__PURE__*/ createReadContract({
    abi: metadataAttributesAbi,
    address: metadataAttributesAddress,
    functionName: 'defaultMetadata',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link metadataAttributesAbi}__ and `functionName` set to `"getDefaultMetadataAsArray"`
 *
 *
 */
export const readMetadataAttributesGetDefaultMetadataAsArray =
  /*#__PURE__*/ createReadContract({
    abi: metadataAttributesAbi,
    address: metadataAttributesAddress,
    functionName: 'getDefaultMetadataAsArray',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleAbi}__
 */
export const useReadArticle = /*#__PURE__*/ createUseReadContract({
  abi: articleAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"channel"`
 */
export const useReadArticleChannel = /*#__PURE__*/ createUseReadContract({
  abi: articleAbi,
  functionName: 'channel',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"generateMetadata"`
 */
export const useReadArticleGenerateMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: articleAbi,
    functionName: 'generateMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"getMetadataHistory"`
 */
export const useReadArticleGetMetadataHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: articleAbi,
    functionName: 'getMetadataHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"metadataHistory"`
 */
export const useReadArticleMetadataHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: articleAbi,
    functionName: 'metadataHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"version"`
 */
export const useReadArticleVersion = /*#__PURE__*/ createUseReadContract({
  abi: articleAbi,
  functionName: 'version',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleAbi}__
 */
export const useWriteArticle = /*#__PURE__*/ createUseWriteContract({
  abi: articleAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"storeKeyValuePairs"`
 */
export const useWriteArticleStoreKeyValuePairs =
  /*#__PURE__*/ createUseWriteContract({
    abi: articleAbi,
    functionName: 'storeKeyValuePairs',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const useWriteArticleUpdateMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: articleAbi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleAbi}__
 */
export const useSimulateArticle = /*#__PURE__*/ createUseSimulateContract({
  abi: articleAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"storeKeyValuePairs"`
 */
export const useSimulateArticleStoreKeyValuePairs =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleAbi,
    functionName: 'storeKeyValuePairs',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link articleAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const useSimulateArticleUpdateMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: articleAbi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__
 */
export const useReadChannel = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"articleHistory"`
 */
export const useReadChannelArticleHistory = /*#__PURE__*/ createUseReadContract(
  { abi: channelAbi, functionName: 'articleHistory' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"articleIDs"`
 */
export const useReadChannelArticleIDs = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'articleIDs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"articles"`
 */
export const useReadChannelArticles = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'articles',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadChannelBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadChannelGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadChannelIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: channelAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"mergeMetadata"`
 */
export const useReadChannelMergeMetadata = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'mergeMetadata',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"metadataAttributes"`
 */
export const useReadChannelMetadataAttributes =
  /*#__PURE__*/ createUseReadContract({
    abi: channelAbi,
    functionName: 'metadataAttributes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"name"`
 */
export const useReadChannelName = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"owner"`
 */
export const useReadChannelOwner = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadChannelOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadChannelSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: channelAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadChannelSymbol = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadChannelTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: channelAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"viewArticleHistory"`
 */
export const useReadChannelViewArticleHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: channelAbi,
    functionName: 'viewArticleHistory',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__
 */
export const useWriteChannel = /*#__PURE__*/ createUseWriteContract({
  abi: channelAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteChannelApprove = /*#__PURE__*/ createUseWriteContract({
  abi: channelAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"editArticle"`
 */
export const useWriteChannelEditArticle = /*#__PURE__*/ createUseWriteContract({
  abi: channelAbi,
  functionName: 'editArticle',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteChannelMint = /*#__PURE__*/ createUseWriteContract({
  abi: channelAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteChannelRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: channelAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteChannelSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: channelAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteChannelSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: channelAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteChannelTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: channelAbi, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteChannelTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: channelAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__
 */
export const useSimulateChannel = /*#__PURE__*/ createUseSimulateContract({
  abi: channelAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateChannelApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: channelAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"editArticle"`
 */
export const useSimulateChannelEditArticle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: channelAbi,
    functionName: 'editArticle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateChannelMint = /*#__PURE__*/ createUseSimulateContract({
  abi: channelAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateChannelRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: channelAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateChannelSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: channelAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateChannelSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: channelAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateChannelTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: channelAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link channelAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateChannelTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: channelAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link channelAbi}__
 */
export const useWatchChannelEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: channelAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchChannelApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: channelAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchChannelApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: channelAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"ArticleCreated"`
 */
export const useWatchChannelArticleCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: channelAbi,
    eventName: 'ArticleCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"ArticleEdited"`
 */
export const useWatchChannelArticleEditedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: channelAbi,
    eventName: 'ArticleEdited',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchChannelOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: channelAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link channelAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchChannelTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: channelAbi,
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"channels"`
 *
 *
 */
export const useReadFactoryChannels = /*#__PURE__*/ createUseReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'channels',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"getAllChannels"`
 *
 *
 */
export const useReadFactoryGetAllChannels = /*#__PURE__*/ createUseReadContract(
  { abi: factoryAbi, address: factoryAddress, functionName: 'getAllChannels' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"getChannels"`
 *
 *
 */
export const useReadFactoryGetChannels = /*#__PURE__*/ createUseReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'getChannels',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"metadataAttributes"`
 *
 *
 */
export const useReadFactoryMetadataAttributes =
  /*#__PURE__*/ createUseReadContract({
    abi: factoryAbi,
    address: factoryAddress,
    functionName: 'metadataAttributes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"publisherToChannels"`
 *
 *
 */
export const useReadFactoryPublisherToChannels =
  /*#__PURE__*/ createUseReadContract({
    abi: factoryAbi,
    address: factoryAddress,
    functionName: 'publisherToChannels',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link factoryAbi}__ and `functionName` set to `"publishers"`
 *
 *
 */
export const useReadFactoryPublishers = /*#__PURE__*/ createUseReadContract({
  abi: factoryAbi,
  address: factoryAddress,
  functionName: 'publishers',
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link factoryAbi}__ and `eventName` set to `"PublisherRegistered"`
 *
 *
 */
export const useWatchFactoryPublisherRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: factoryAbi,
    address: factoryAddress,
    eventName: 'PublisherRegistered',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metadataAttributesAbi}__
 *
 *
 */
export const useReadMetadataAttributes = /*#__PURE__*/ createUseReadContract({
  abi: metadataAttributesAbi,
  address: metadataAttributesAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metadataAttributesAbi}__ and `functionName` set to `"defaultMetadata"`
 *
 *
 */
export const useReadMetadataAttributesDefaultMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: metadataAttributesAbi,
    address: metadataAttributesAddress,
    functionName: 'defaultMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metadataAttributesAbi}__ and `functionName` set to `"getDefaultMetadataAsArray"`
 *
 *
 */
export const useReadMetadataAttributesGetDefaultMetadataAsArray =
  /*#__PURE__*/ createUseReadContract({
    abi: metadataAttributesAbi,
    address: metadataAttributesAddress,
    functionName: 'getDefaultMetadataAsArray',
  })
