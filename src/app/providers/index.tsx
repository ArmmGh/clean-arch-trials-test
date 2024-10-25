'use client'

import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'

import { TooltipProvider } from '@/components/ui/tooltip'
import { getConfig } from '@/lib/config/wagmi'
import QueryClientProvider from './query-client-provider'
import { ThemeProvider } from './theme-provider'

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
