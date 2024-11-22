import {
  useReadChannelPublicationIDs,
  useReadFollowChannelsChannelsFollowersCount,
  useReadFollowChannelsIsFollowing,
} from '@/generated'
import { useAppKitAccount } from '@reown/appkit/react'
import { Address } from 'viem'
import FollowChannelButton from './follow-channel-button'
import { ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import Link from 'next/link'
import { defaultChain } from '@/lib/config/chains'

export default function CurrentChannelItem(props: { address?: Address; name?: string }) {
  const { address: userAddress } = useAppKitAccount()
  const { data: isFollowing } = useReadFollowChannelsIsFollowing({
    args: [userAddress as Address, props.address!],
    query: { enabled: !!(userAddress && props.address) },
  })
  const { data: followers = 0, isLoading: isLoadingFollowers } = useReadFollowChannelsChannelsFollowersCount({
    args: [props.address!],
    query: { enabled: !!props.address },
  })
  const { data: posts = 0, isLoading: isLoadingPosts } = useReadChannelPublicationIDs({ address: props.address })

  const scannerLink = `${defaultChain.blockExplorers?.default.url}/token/${props.address}`
  const isLoadingMetadata = isLoadingFollowers || isLoadingPosts

  return (
    <div className='flex rounded-xl border border-slate-200 bg-[#EEEEF8] px-3 py-4'>
      <Avatar className='relative h-10 w-10 outline outline-1 outline-offset-1 outline-teal-500'>
        <AvatarImage src='/placeholder.svg' alt={props.name} />

        <AvatarFallback>
          {props?.name
            ?.split(' ')
            .map((word) => word[0].toUpperCase())
            .join('')}
        </AvatarFallback>
      </Avatar>

      <div className='flex flex-1 overflow-hidden'>
        <div className='flex flex-1 flex-col overflow-hidden px-2'>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-black'>
            {props.name}
          </div>
          <div className='flex text-xs font-medium text-slate-400'>
            {isLoadingMetadata ? (
              'Loading...'
            ) : (
              <React.Fragment>
                {followers} followers / {posts} posts
              </React.Fragment>
            )}
          </div>

          {props.address && (
            <FollowChannelButton
              isFollowing={isFollowing}
              channelAddress={props.address}
              className='mt-2 border border-slate-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0'
            />
          )}
        </div>
        <Link href={scannerLink} target='_blank' prefetch={false}>
          <ExternalLink size={16} className='text-teal-700' />
        </Link>
      </div>
    </div>
  )
}
