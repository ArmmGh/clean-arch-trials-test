'use client'

import Articles from '@/components/articles/Articles'
import Channel from '@/components/channels/Channel'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Channel as ChannelType } from '@/entities/models/channel'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function DashboardChannels({
  channels,
  addressFromCookie,
}: {
  channels: ChannelType[]
  addressFromCookie: string
}) {
  const { address } = useAccount()
  const router = useRouter()
  const [activeChannel, setActiveChannel] = useState<ChannelType>()

  useEffect(() => {
    if (address) {
      if (addressFromCookie !== address) {
        router.refresh()
      }
      return
    }

    router.replace('/')
  }, [address, router, addressFromCookie])

  return (
    <div className='border-1 flex flex-1 flex-row overflow-hidden'>
      <ScrollArea className='w-1/3 flex-1 border-r'>
        {channels?.map((channel, index: any) => (
          <Channel
            isActive={activeChannel?.address === channel.address}
            onChannelClick={() => setActiveChannel(channel)}
            key={index}
            channel={channel}
          />
        ))}
      </ScrollArea>

      <ScrollArea className='w-2/3 p-6'>
        {activeChannel && <Articles channelAddress={activeChannel.address} channelOwner={activeChannel.owner} />}
      </ScrollArea>
    </div>
  )
}
