import { readFollowChannelsFollowedChannelsList } from '@/generated'
import { config } from '@/lib/config/wagmi'

import { Address } from 'viem'

export const getFollowingChannels = async (address: Address) => {
  const followingChannels = await readFollowChannelsFollowedChannelsList(config, { account: address })

  return followingChannels
}
