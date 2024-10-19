'use client'

import type { Channel as ChannelType } from '@/entities/models/channel'
import Channel from './Channel'
import Articles from '@/components/articles/Articles'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Channels({ channels }: { channels: ChannelType[] }) {
  const [activeChannel, setActiveChannel] = useState<ChannelType>()

  if (channels.length === 0) {
    return <div className='px-4'>No channels found</div>
  }

  return (
    <div className='border-1 flex flex-1 flex-row overflow-hidden'>
      <ScrollArea className='w-1/3 border-r'>
        {channels.map((channel: any, index: any) => (
          <Channel
            key={index}
            isActive={activeChannel?.address === channel.address}
            onChannelClick={() => setActiveChannel(channel)}
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
