'use client'

import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'

import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import QueryClientProvider from './query-client-provider'
import { getConfig } from '@/lib/config/wagmi'

export function Providers(props: { children: ReactNode; initialState?: State }) {
  const [config] = useState(() => getConfig())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <TooltipProvider>{props.children}</TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
