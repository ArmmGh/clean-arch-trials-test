'use client'

import { followChannelAction } from '@/actions/client/follow-channel.action'
import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Address } from 'viem'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'

export default function FollowChannelButton({
  channelAddress,
  className,
  isFollowing = false,
  ...props
}: {
  channelAddress: Address
  className?: string
  isFollowing?: boolean
  [key: string]: any
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAppKitAccount()
  const { open } = useAppKit()

  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!address) {
      open({ view: 'Connect' })

      return
    }

    if (!channelAddress || isLoading) return

    setIsLoading(true)

    await followChannelAction({ channelAddress })

    router.refresh()

    setIsLoading(false)
  }

  return (
    <Button
      variant={'ghost'}
      size={'sm'}
      onClick={onFollow}
      className={cn('flex items-center gap-1 text-xs font-medium text-primary', className)}
      {...props}
    >
      {isLoading ? <Loader2 size={16} className='animate-spin' /> : <Plus size={16} />}
      Follow
    </Button>
  )
}
