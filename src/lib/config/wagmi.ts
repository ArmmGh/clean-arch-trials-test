import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { getSupportedChains } from './chains'
import { transports } from './transports'

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

// import { cookieStorage, createConfig, createStorage } from 'wagmi'
// import { walletConnect } from 'wagmi/connectors'
// import { getSupportedChains } from './chains'
// import { transports } from './transports'

// export const config = createConfig({
//   chains: getSupportedChains(),
//   connectors: [
//     walletConnect({
//       projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'DEFAULT_WC_PROJECT_ID',
//     }),
//   ],
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   ssr: true,
//   transports,
// })

// export function getConfig() {
//   return config
// }

// declare module 'wagmi' {
//   interface Register {
//     config: ReturnType<typeof getConfig>
//   }
// }
