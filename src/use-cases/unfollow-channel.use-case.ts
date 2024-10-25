import { AuthorizeError } from '@/entities/errors/common'
import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function unfollowChannelUseCase(
  channelAddress: Address,
  clientUserAddress: Address,
  serverUserAddress: Address,
) {
  const isAuthorizedUser = clientUserAddress === serverUserAddress
  const channelRepo = getInjection('IChannelsRepository')

  if (!isAuthorizedUser) {
    throw new Error('Not Authorized Access')
  }

  const isFollowing = await channelRepo.isUserFollowingChannel(channelAddress, clientUserAddress)

  if (!isFollowing) {
    throw new AuthorizeError('User is not following the channel') // TODO: Add a custom error class
  }

  const followResult = await channelRepo.unfollowChannel(channelAddress, clientUserAddress)

  return followResult
}
