import getAddressFromSession from '@/actions/utils/get-address-from-session.util'
import SuggestedChannelItem from '@/components/channels/suggested-channel-item'
import { Button } from '@/components/ui/button'
import getSuggestedChannelsController from '@/controllers/channels/get-suggested-channels.controller'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { Address } from 'viem'

const getSuggestedChannels = async (userAddress?: Address) => {
  try {
    const suggestedChannels = await getSuggestedChannelsController({ userAddress })

    return suggestedChannels
  } catch (error) {
    return []
  }
}

export default async function SuggestedChannels(props: { className?: string }) {
  const userAddress = await getAddressFromSession()
  const suggestedChannels = await getSuggestedChannels(userAddress)

  return (
    <div className={cn('flex flex-col gap-4 rounded-xl border bg-white p-4', props.className)}>
      <h2 className='text-lg font-semibold'>Suggested Channels</h2>

      <div className='flex flex-col gap-4'>
        {suggestedChannels.map((props, index) => (
          <SuggestedChannelItem className='border-b-[0.5px] border-b-slate-200 pb-2' key={index} {...props} />
        ))}
      </div>

      <Button variant='ghost' className='w-full gap-2'>
        Show More
        <ChevronDown className='h-4 w-4' />
      </Button>
    </div>
  )
}
