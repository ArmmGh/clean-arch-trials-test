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
    <div className='flex text-sm gap-1 flex-col items-center w-full bg-orange-600/10 border-b-2 border-orange-600/20 text-center p-4'>
      <div className='flex items-center gap-1 text-orange-700'>
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
