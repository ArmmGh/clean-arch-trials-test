import { defineConfig, loadEnv } from '@wagmi/cli'
import { factoryAbi } from '@/abi/factoryAbi'
import { actions, react } from '@wagmi/cli/plugins'
import { defaultChain } from '@/lib/config/chains'
import { articleAbi } from '@/abi/articleAbi'
import { channelAbi } from '@/abi/channelAbi'
import { metadataAttributesAbi } from '@/abi/metadataAttributesAbi'
import { getAddress } from 'viem'

export default defineConfig(() => {
  loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  })

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
