import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function getNotificationsUseCase(userAddress: Address): Promise<string[]> {
  const channelsRepo = getInjection('IChannelsRepository')

  const notifications = await channelsRepo.getNotifications(userAddress)

  return notifications
}
