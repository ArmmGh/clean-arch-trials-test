import { Channel } from '@/entities/models/channel'
import Image from 'next/image'
import FollowChannelButton from './follow-channel-button'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ChannelItemInList({
  name,
  symbol,
  address,
  withFollowButton = false,
}: {
  withFollowButton?: boolean
  name: Channel['name']
  symbol: Channel['symbol']
  address: Channel['address']
}) {
  // TODO: maybe shorten address with first and last chars for url
  return (
    <Link href={`/channel/${address}`} prefetch={true} className='flex justify-between px-2 py-1'>
      <div className='flex items-center gap-2 overflow-hidden'>
        <div className='relative h-10 w-10'>
          {/* TODO: maybe show ipfs image? */}
          <Image src='/placeholder.svg' alt={name} className='rounded-full' fill />
        </div>

        <div className='flex-1 overflow-hidden'>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-black'>{name}</div>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-600'>{symbol}</div>
        </div>
      </div>

      <Suspense fallback={<Loader2 className='animate-spin' />}>
        {withFollowButton && <FollowChannelButton channelAddress={address} />}
      </Suspense>
    </Link>
  )
}
