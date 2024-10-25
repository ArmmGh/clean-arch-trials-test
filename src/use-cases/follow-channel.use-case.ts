import { AuthorizeError } from '@/entities/errors/common'
import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function followChannelUseCase(
  channelAddress: Address,
  clientUserAddress: Address,
  serverUserAddress: Address,
) {
  const isAuthorizedUser = clientUserAddress === serverUserAddress
  const channelRepo = getInjection('IChannelsRepository')

  if (!isAuthorizedUser) {
    throw new Error('Not Authorized Access')
  }

  const isAlreadyFollower = await channelRepo.isUserFollowingChannel(channelAddress, clientUserAddress)

  if (isAlreadyFollower) {
    throw new AuthorizeError('User is already subscribed to channel') // TODO: Add a custom error class
  }

  const followResult = await channelRepo.followChannel(channelAddress, clientUserAddress)

  return followResult
}
