import { Channel, ChannelInContract } from '@/entities/models/channel'
import { ChannelRequest } from '@/entities/types/channels/channel-request.type'
import { channelsRowSchema } from '@/database.schemas'
import { Address } from 'viem'
import { z } from 'zod'
import { ChannelRow } from '@/entities/types/channels/index.types'

export interface IChannelsRepository {
  getAllChannelRows(): Promise<ChannelRow[]>
  getChannelIdByAddress(channelAddress: Address): Promise<number>
  getChannelRowByAddress(channelAddress: Address): Promise<ChannelRow> //TODO: fix Channel Type
  getUserChannelRows(userAddress: Address): Promise<ChannelRow[]>
  getChannelInContract(channelAddress: Address): Promise<ChannelInContract>
  // OLD
  getWhitelistedChannelAddresses(): Promise<Address[]>
  getAllPublisherChannelAddresses(publisherAddress: Address): Promise<string[]>
  _getChannelByAddress(channelAddress: Address): Promise<ChannelInContract>
  getChannelOwnerById({ id }: { id: Address }): Promise<any>
  getLastArticleId(channelAddress: Address): Promise<bigint>
  isUserFollowingChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  followChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  unfollowChannel(channelAddress: Address, userAddress: Address): Promise<boolean>
  getFollowedChannels(userAddress: Address):
    | any
    | Promise<
        {
          channel_address: string | null
        }[]
      >
  getFollowersCount(channelAddress: Address): Promise<number>
  getFollowers(channelAddress: Address): Promise<
    | any
    | {
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
