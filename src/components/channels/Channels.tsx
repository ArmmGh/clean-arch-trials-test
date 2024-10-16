'use client'

import { Address } from 'viem'
import type { Channel as ChannelType } from '@/entities/models/channel'
import Channel from './Channel'
import Articles from '@/components/articles/Articles'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Channels({ channels }: { channels: ChannelType[] }) {
  const [activeChannel, setActiveChannel] = useState<ChannelType>()

  return (
    <div className='border-1 flex flex-1 flex-row overflow-hidden'>
      <ScrollArea className='w-1/3 border-r'>
        {channels.map((channel, index) => (
          <Channel
            activeChannelOwner={activeChannel?.owner}
            onChannelClick={() => setActiveChannel(channel)}
            key={index}
            channel={channel}
          />
        ))}
      </ScrollArea>

      <ScrollArea className='w-2/3 p-6'>
        <Articles activeChannel={activeChannel} />
      </ScrollArea>
    </div>
  )
}
