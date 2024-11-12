'use client'

import { Button } from '@/components/ui/button'
import { TriangleAlert } from 'lucide-react'
import { useAccount, useChainId, useChains, useSwitchChain } from 'wagmi'

export default function WrongNetworkNotifier() {
  const { isConnected, chainId } = useAccount()
  const defaultChainId = useChainId()
  const chains = useChains()
  const { switchChainAsync } = useSwitchChain()

  const isWrongNetwork = isConnected && chainId !== defaultChainId
  const supportedChain = chains.find((c) => c.id === defaultChainId)

  if (!isWrongNetwork || !supportedChain) return null

  return (
    <div className='absolute left-0 right-0 z-20 flex w-full flex-col items-center gap-1 border-b-2 border-orange-600/20 bg-orange-600/40 p-4 text-center text-sm'>
      <div className='flex items-center gap-1 text-orange-950'>
        <TriangleAlert />
        <p>
          Unsupported chain. Please switch to <span className='font-bold'>{supportedChain.name}</span> in your wallet.
        </p>
      </div>

      <Button onClick={() => switchChainAsync({ chainId: supportedChain.id })} size={'sm'} variant={'outline'}>
        Switch to {supportedChain.name}
      </Button>
    </div>
  )
}
