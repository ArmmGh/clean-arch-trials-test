import { articleAbi } from '@/abi/article-abi'
import { behaviorAbi } from '@/abi/behavior-abi'
import { channelAbi } from '@/abi/channel-abi'
import { channelLedgerAbi } from '@/abi/channel-ledger-abi'
import { factoryAbi } from '@/abi/factory-abi'
import { followChannelsAbi } from '@/abi/follow-channels-abi'
import { mainTowerAbi } from '@/abi/main-tower-abi'
import { mediaPlatformAbi } from '@/abi/media-platform-abi'
import { metadataAttributesAbi } from '@/abi/metadata-attributes-abi'
import { availableChains } from '@/lib/config/chains'
import nextEnv from '@next/env'
import { defineConfig } from '@wagmi/cli'
import { actions, react } from '@wagmi/cli/plugins'
import { getAddress } from 'viem'

export default defineConfig(() => {
  const { loadEnvConfig } = nextEnv
  const projectDir = process.cwd()
  loadEnvConfig(projectDir, process.env.NODE_ENV === 'development')

  const defaultChain = availableChains[Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)]

  return {
    out: 'src/generated.ts',
    contracts: [
      {
        name: 'Behavior',
        abi: behaviorAbi,
        address: {
          [defaultChain.id]: getAddress(process.env.NEXT_PUBLIC_BEHAVIOR_ADDRESS!),
        },
      },
      {
        name: 'MediaPlatform',
        abi: mediaPlatformAbi,
        address: {
          [defaultChain.id]: getAddress(process.env.NEXT_PUBLIC_MEDIA_PLATFORM_ADDRESS!),
        },
      },
      {
        name: 'MetadataAttributes',
        abi: metadataAttributesAbi,
        address: {
          [defaultChain.id]: getAddress(process.env.NEXT_PUBLIC_METADATA_ATTRIBUTES_ADDRESS!),
        },
      },
      {
        name: 'Factory',
        abi: factoryAbi,
        address: {
          [defaultChain.id]: getAddress(process.env.NEXT_PUBLIC_FACTORY_ADDRESS!),
        },
      },
      {
        name: 'ChannelLedger',
        abi: channelLedgerAbi,
        address: {
          [defaultChain.id]: getAddress(process.env.NEXT_PUBLIC_CHANNEL_LEDGER_ADDRESS!),
        },
      },
      {
        name: 'Channel',
        abi: channelAbi,
      },
      {
        name: 'Article',
        abi: articleAbi,
      },
      {
        name: 'MainTower',
        abi: mainTowerAbi,
        address: {
          [defaultChain.id]: getAddress(process.env.NEXT_PUBLIC_MAIN_TOWER_ADDRESS!),
        },
      },
      {
        name: 'FollowChannels',
        abi: followChannelsAbi,
        address: {
          [defaultChain.id]: getAddress(process.env.NEXT_PUBLIC_FOLLOW_CHANNELS_ADDRESS!),
        },
      },
    ],
    plugins: [actions(), react()],
  }
})
