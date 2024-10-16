// useCases/GetAllChannelsUseCase.ts
import { Address } from 'viem'
import { getInjection } from '@/lib/di/container'

export async function getAllChannelIdsUseCase(publisherAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  return channelsRepo.getAllChannelIds({ publisherAddress })
}
