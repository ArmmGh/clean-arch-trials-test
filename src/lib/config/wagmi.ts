import { cookieStorage, createConfig, createStorage } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'
import { getSupportedChains } from './chains'
import { transports } from './transports'

export const config = createConfig({
  chains: getSupportedChains(),
  connectors: [
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'DEFAULT_WC_PROJECT_ID',
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports,
})

export function getConfig() {
  return config
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
