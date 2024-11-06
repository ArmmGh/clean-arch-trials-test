import MyChannelsList from '@/components/channels/my-channels-list'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export default function ChannelChooser({ activeChannelAddress }: { activeChannelAddress?: string }) {
  return (
    <div>
      <p className='mb-1 text-center'>Choose a channel</p>
      <ScrollArea className='w-[650px] whitespace-nowrap rounded-t-lg border-2 border-b-0 border-muted'>
        <div className='flex w-max space-x-4 p-4'>
          <MyChannelsList
            className={`w-[250px] rounded-lg ${!activeChannelAddress && 'animate-pulse duration-1000'}`}
          />
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  )
}
