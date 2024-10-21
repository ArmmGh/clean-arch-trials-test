import { articleAbi } from '@/abi/articleAbi'
import { channelAbi } from '@/abi/channelAbi'
import { factoryAbi } from '@/abi/factoryAbi'
import { metadataAttributesAbi } from '@/abi/metadataAttributesAbi'
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
        name: 'Channel',
        abi: channelAbi,
      },
      {
        name: 'Article',
        abi: articleAbi,
      },
    ],
    plugins: [actions(), react()],
  }
})
