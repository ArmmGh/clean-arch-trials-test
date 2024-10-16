import { http } from 'wagmi'
import { getSupportedChains } from './chains'

export const transports = getSupportedChains().reduce(
  (acc, chain) => {
    acc[chain.id] = http()
    return acc
  },
  {} as Record<number, ReturnType<typeof http>>,
)
