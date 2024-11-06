import { getInjection } from '@/lib/di/container'

export default async function getChannelRequestsForAdminUseCase() {
  const channelsRepo = getInjection('IChannelsRepository')

  const channelRequests = await channelsRepo.getChannelRequests()

  return channelRequests
}
