'use client'

import followChannelAction from '@/app/actions/follow-channel.action'
import unfollowChannelAction from '@/app/actions/unfollow-channel.action'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import { getAddress } from 'viem'

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
  // const [isLoading, setIsLoading] = useState(false)

  // const [isPending, startTransition] = useTransition();

  const handleFollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    // if (isLoading) return

    // setIsLoading(true)

    if (isFollowing) {
      await unfollowChannelAction({ channelAddress: channelAddress, clientUserAddress: getAddress(userAddress) })
    } else {
      await followChannelAction({ channelAddress: channelAddress, clientUserAddress: getAddress(userAddress) })
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
