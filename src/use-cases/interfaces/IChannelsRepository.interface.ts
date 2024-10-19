import { Channel } from '@/entities/models/channel'
import { Address } from 'viem'

export interface IChannelsRepository {
  getAllChannelAddresses(): Promise<readonly `0x${string}`[]>
  getAllPublisherChannelAddresses(publisherAddress: Address): Promise<string[]>
  getChannelByAddress(channelAddress: Address): Promise<Channel>
  getChannelOwnerById({ id }: { id: Address }): Promise<any>
  getArticleById(channelAddress: Address, articleId: number): Promise<string> //TODO: article
  getLastArticleId(channelAddress: Address): Promise<bigint>
}
