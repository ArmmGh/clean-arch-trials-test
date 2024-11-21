import { Channel, ChannelInContract } from '@/entities/models/channel'
import { ChannelRequest } from '@/entities/types/channel/channel-request.type'
import { channelsRowSchema } from '@/database.schemas'
import { Address } from 'viem'
import { z } from 'zod'

export interface IChannelsRepository {
  getAllChannels(): Promise<z.infer<typeof channelsRowSchema>[]>
  getChannelIdByAddress(channelAddress: Address): Promise<number>
  getChannelByAddress(channelAddress: Address): Promise<Channel> //TODO: fix Channel Type
  // OLD
  getWhitelistedChannelAddresses(): Promise<Address[]>
  getAllPublisherChannelAddresses(publisherAddress: Address): Promise<string[]>
  _getChannelByAddress(channelAddress: Address): Promise<ChannelInContract>
  getChannelOwnerById({ id }: { id: Address }): Promise<any>
  getLastArticleId(channelAddress: Address): Promise<bigint>
  isUserFollowingChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  followChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  unfollowChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  getFollowedChannels(userAddress: Address): Promise<
    {
      channel_address: string | null
    }[]
  >
  getFollowersCount(channelAddress: Address): Promise<number>
  getFollowers(channelAddress: Address): Promise<
    {
      user_address: string
    }[]
  >
  addChannelNotifications(notifications: { channel_address: string; user_address: string }[]): Promise<boolean>
  markChannelAsRead(userAddress: Address, channelAddress: Address): Promise<boolean>
  getChannelRequests(): Promise<ChannelRequest[]>
  addChannelRequest(
    channelAddress: Address,
    channelOwner: Address,
    status?: ChannelRequest['status'],
  ): Promise<ChannelRequest>
  whitelistChannelRequest(channelAddress: Address): Promise<ChannelRequest>
  blacklistChannelRequest(channelAddress: Address): Promise<ChannelRequest>
  getOtherChannelRequests(): Promise<ChannelRequest[]>
  getAllChannelAddresses(): Promise<Address[]>
  getFollowingChannels(userAddress: Address): Promise<Address[]>
}
