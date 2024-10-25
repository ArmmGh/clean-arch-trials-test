import { Channel } from '@/entities/models/channel'
import { Address } from 'viem'

export interface IChannelsRepository {
  getAllChannelAddresses(): Promise<readonly `0x${string}`[]>
  getAllPublisherChannelAddresses(publisherAddress: Address): Promise<string[]>
  getChannelByAddress(channelAddress: Address): Promise<Channel>
  getChannelOwnerById({ id }: { id: Address }): Promise<any>
  getArticleById(channelAddress: Address, articleId: number): Promise<string> //TODO: article
  getLastArticleId(channelAddress: Address): Promise<bigint>
  isUserFollowingChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  followChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  unfollowChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  getFollowedChannels(userAddress: Address): Promise<
    {
      channel_address: string | null
    }[]
  >
  // TODO: check how getNotifications is used for return Types
  getFollowersCount(channelAddress: Address): Promise<number>
  getFollowers(channelAddress: Address): Promise<
    {
      user_address: string
    }[]
  >
  addChannelNotifications(notifications: { channel_address: string; user_address: string }[]): Promise<boolean>
  markChannelAsRead(userAddress: Address, channelAddress: Address): Promise<boolean>
  getNotifications(userAddress: Address): Promise<string[]>
}
