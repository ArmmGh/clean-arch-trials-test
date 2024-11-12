'use client'

// import followChannelAction from '@/actions/follow-channel.action'
// import unfollowChannelAction from '@/actions/unfollow-channel.action'
import { Button } from '@/components/ui/button'
import { useWriteFollowChannelsFollowChannel, useWriteFollowChannelsUnfollowChannel } from '@/generated'
import { config } from '@/lib/config/wagmi'
import { cn, openStatusToast, openWaitingToast } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import { getAddress } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

export default function FollowButton({
  isFollowing = false,
  channelAddress,
  userAddress,
  isActive,
  className,
}: {
  isFollowing?: boolean
  channelAddress: string
  userAddress: string
  isActive?: boolean
  className?: string
}) {
  const { writeContractAsync: follow } = useWriteFollowChannelsFollowChannel()
  const { writeContractAsync: unfollow } = useWriteFollowChannelsUnfollowChannel()
  // const [isLoading, setIsLoading] = useState(false)

  // const [isPending, startTransition] = useTransition();

  const handleFollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    // if (isLoading) return

    // setIsLoading(true)

    if (isFollowing) {
      const hash = await unfollow({ args: [getAddress(channelAddress)] })

      openWaitingToast()

      const { status } = await waitForTransactionReceipt(config, { hash })

      openStatusToast(status === 'reverted')
      // await unfollowChannelAction({ channelAddress: channelAddress, clientUserAddress: getAddress(userAddress) })
    } else {
      const hash = await follow({ args: [getAddress(channelAddress)] })

      openWaitingToast()

      const { status } = await waitForTransactionReceipt(config, { hash })

      openStatusToast(status === 'reverted')

      // await followChannelAction({ channelAddress: channelAddress, clientUserAddress: getAddress(userAddress) })
    }

    // setIsLoading(false)
  }

  return (
    <Button
      onClick={handleFollowClick}
      size={'sm'}
      variant='outline'
      className={cn('self-end px-3 shadow-none', className)}
    >
      {/* {isLoading ? (
        <Loader2 className={`h-4 w-4 animate-spin ${!isFollowing && 'mr-1'}`} />
      ) : (
      )} */}
      <StarIcon className={`h-4 w-4 ${isFollowing ? 'fill-primary' : 'mr-1'}`} />
      {!isFollowing && 'Follow'}
    </Button>
  )
}
