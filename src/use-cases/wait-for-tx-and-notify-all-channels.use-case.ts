import { AuthorizeError } from '@/entities/errors/common'
import { config } from '@/lib/config/wagmi'
import { getInjection } from '@/lib/di/container'
import { Address, Hash } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

export default async function waitForTxAndNotifyAllChannelsUseCase(
  txHash: Hash,
  channelAddress: Address,
): Promise<boolean> {
  const tx = await waitForTransactionReceipt(config, { hash: txHash })

  if (tx.status === 'success') {
    const channelsRepo = getInjection('IChannelsRepository')

    const followers = await channelsRepo.getFollowers(channelAddress)

    if (!followers) {
      throw new AuthorizeError('No followers found')
    }

    const notifications = followers.map((follower) => ({
      channel_address: channelAddress.toString(),
      user_address: follower.user_address,
    }))

    const added = channelsRepo.addChannelNotifications(notifications)

    return added
  }

  return false
}
