'use client'

import { type ReactNode } from 'react'
import { WagmiProvider, type Config, cookieToInitialState } from 'wagmi'

import { TooltipProvider } from '@/components/ui/tooltip'
import { projectId, wagmiAdapter } from '@/lib/config/wagmi'
import QueryClientProvider from './query-client-provider'
import { ThemeProvider } from './theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { createAppKit } from '@reown/appkit'
import { defaultChain, getSupportedChains } from '@/lib/config/chains'
import { siweConfig } from '@/lib/siwe/config'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const metadata = {
  name: 'social-media',
  description: 'Decentralized Social Media',
  // url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: getSupportedChains(),
  defaultNetwork: defaultChain,
  metadata: metadata,
  features: {
    email: false,
    socials: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  siweConfig,
})

export function Providers(props: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, props.cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <TooltipProvider>{props.children}</TooltipProvider>
          </SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
