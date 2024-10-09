import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { bahamut, mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, bahamut],
  connectors: [
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'DEFAULT_WC_PROJECT_ID',
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bahamut.id]: http(),
  },
})

export function getConfig() {
  return config
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
