import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Channel as ChannelType } from '@/entities/models/channel'
import Channel from '@/components/channels/Channel'
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
    <ScrollArea className='w-[450px] whitespace-nowrap rounded-t-lg border-2 border-b-0 border-muted'>
      <div className='flex w-max space-x-4 p-4'>
        {channels.map((channel, index) => (
          <Channel
            isActive={activeChannelAddress === channel.address}
            onChannelClick={() => handleChannelClick(channel.address)}
            key={index}
            channel={channel}
            className='rounded-lg'
          />
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
