'use client'

import { followChannelAction } from '@/actions/client/follow-channel.action'
import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Address } from 'viem'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function FollowChannelButton({ channelAddress }: { channelAddress: Address }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onFollow = async () => {
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
      className='flex items-center gap-1 text-xs font-medium text-primary'
    >
      {isLoading ? <Loader2 size={16} className='animate-spin' /> : <Plus size={16} />}
      Follow
    </Button>
  )
}
