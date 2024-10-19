import { defaultChain, getSupportedChains } from '@/lib/config/chains'
import { transports } from '@/lib/config/transports'
import { createPublicClient, http } from 'viem'

export function createViemClient() {
  const supportedChains = getSupportedChains()
  const selectedChain = defaultChain || supportedChains[0]
  const transport = transports[selectedChain.id] || http()

  return createPublicClient({
    chain: selectedChain,
    transport: transport,
  })
}
