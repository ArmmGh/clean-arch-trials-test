import { http } from 'wagmi'
import { getSupportedChains } from './chains'
import { AppKitNetwork } from '@reown/appkit/networks'

export const transports = Object.fromEntries(
  getSupportedChains().map((chain: AppKitNetwork) => [chain.id, http()]),
) as Record<number, ReturnType<typeof http>>
