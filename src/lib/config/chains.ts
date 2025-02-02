import { type AppKitNetwork, bahamut, Chain, hardhat } from '@reown/appkit/networks'

export const availableChains: Record<Chain['id'], Chain> = {
  [bahamut.id]: bahamut,
  [hardhat.id]: hardhat,
}

export function getSupportedChains() {
  const chainIds = process.env.NEXT_PUBLIC_SUPPORTED_CHAINS?.split(',').map(Number) || []

  const supportedChains = chainIds.map((id) => availableChains[id]).filter(Boolean)

  if (supportedChains.length === 0) {
    supportedChains.push(hardhat)
  }

  return supportedChains as [AppKitNetwork, ...AppKitNetwork[]]
}

export const defaultChain: Chain = availableChains[Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN)] || hardhat
