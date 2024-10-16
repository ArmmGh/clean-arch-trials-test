import { defineConfig } from '@wagmi/cli'
import { articleFactoryAbi } from '@/abi/articleFactoryAbi'
import { factoryAbi } from '@/abi/factoryAbi'
import { actions, react } from '@wagmi/cli/plugins'
import { contracts } from '@/lib/config/contracts'
import { defaultChain } from '@/lib/config/chains'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'Factory',
      abi: factoryAbi,
      address: {
        [defaultChain.id]: contracts.factoryAddress,
      },
    },
    {
      name: 'ArticleFactory',
      abi: articleFactoryAbi,
    },
  ],
  plugins: [actions(), react()],
})
