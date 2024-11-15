'use client'

import { useAppKit, useAppKitAccount, useAppKitState } from '@reown/appkit/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ConnectWallet({ className }: { className?: string }) {
  const { isConnected } = useAppKitAccount()
  const { loading } = useAppKitState()
  const { open } = useAppKit()

  if (loading)
    return (
      <div className={cn('flex justify-end gap-[6px] py-1 pl-[6px] pr-[14px] text-black', className)}>
        <Loader2 strokeWidth={2} className='animate-spin' size={20} />{' '}
        <p className='text-sm font-medium'>Connecting...</p>
      </div>
    )

  return (
    <div>
      {isConnected ? (
        // @ts-expect-error
        <appkit-button balance='hide' />
      ) : (
        <Button onClick={() => open({ view: 'Connect' })}>Connect</Button>
      )}
    </div>
  )
}
