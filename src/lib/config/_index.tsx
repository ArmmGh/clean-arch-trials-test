import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { getSupportedChains } from './chains'
import { transports } from './transports'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports,
  ssr: true,
  projectId,
  networks: getSupportedChains(),
})

export const config = wagmiAdapter.wagmiConfig
