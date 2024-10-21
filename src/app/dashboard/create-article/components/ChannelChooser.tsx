import Channel from '@/components/channels/Channel'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Channel as ChannelType } from '@/entities/models/channel'
import { Address } from 'viem'

export default function ChannelChooser({
  channels,
  activeChannelAddress,
  handleChannelClick,
}: {
  channels: ChannelType[]
  activeChannelAddress?: string
  handleChannelClick: (channelAddress: Address) => void
}) {
  return (
    <div>
      <p className='text-center mb-1'>Choose a channel</p>
      <ScrollArea className='w-[450px] whitespace-nowrap rounded-t-lg border-2 border-b-0 border-muted'>
        <div className='flex w-max space-x-4 p-4'>
          {channels.map((channel, index) => (
            <Channel
              isActive={activeChannelAddress === channel.address}
              onChannelClick={() => handleChannelClick(channel.address)}
              key={index}
              channel={channel}
              className={`rounded-lg ${!activeChannelAddress ? 'animate-pulse duration-1000' : ''}`}
            />
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  )
}
