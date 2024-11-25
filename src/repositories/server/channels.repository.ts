import { channelLedgerAbi } from '@/abi/channel-ledger-abi'
import { followChannelsAbi } from '@/abi/follow-channels-abi'
import { mediaPlatformAbi } from '@/abi/media-platform-abi'
import { SupabaseError } from '@/entities/errors/common'
import { ChannelRequest } from '@/entities/types/channels/channel-request.type'
import { channelAbi } from '@/generated'
import { contracts } from '@/lib/config/contracts'
import { createClient } from '@/lib/utils/supabase/server'
import { createViemClient } from '@/lib/utils/viemClient'
import { IChannelsRepository } from '@/use-cases/interfaces/channels-repository.interface'
import { Address, PublicClient, zeroAddress } from 'viem'

// TODO: move to a common file
enum SUPABASE_STATUSES {
  SUCCESS = 201,
  DELETE_SUCCESS = 204,
}

export class ChannelsRepository implements IChannelsRepository {
  private client: PublicClient
  private envType: typeof process.env.NODE_ENV

  constructor() {
    this.client = createViemClient()
    this.envType = process.env.NODE_ENV
  }

  async getUserChannelRows(userAddress: Address) {
    const supabase = await createClient()

    const { data: channels, error } = await supabase
      .from('channels')
      .select()
      .eq('verification_status', 'Verified')
      .eq('owner_address', userAddress)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return channels
  }

  async getAllChannels() {
    const supabase = await createClient()

    const { data: channels, error } = await supabase.from('channels').select().eq('verification_status', 'Verified')

    if (error) {
      throw new SupabaseError(error.message)
    }

    return channels
  }

  async getChannelIdByAddress(channelAddress: Address) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('channels')
      .select('id')
      .eq('channel_address', channelAddress)
      // .eq('env_type', this.envType)
      .limit(1)
      .single()

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data.id
  }

  async getChannelByAddress(channelAddress: Address) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('channels')
      .select()
      .eq('channel_address', channelAddress)
      // .eq('env_type', this.envType)
      .limit(1)
      .single()

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data
  }

  // OLD

  async getAllPublisherChannelAddresses(publisherAddress: Address) {
    const addresses = await this.client.readContract({
      abi: channelLedgerAbi,
      functionName: 'allChannelsForPublisher',
      args: [publisherAddress],
      address: contracts.channelLedger,
    })

    return addresses as Address[]
  }

  async _getChannelByAddress(channelAddress: Address) {
    const channelContract = {
      abi: channelAbi,
      address: channelAddress,
    }

    const [name, symbol, owner] = await Promise.all([
      this.client.readContract({
        ...channelContract,
        functionName: 'name',
      }),
      this.client.readContract({
        ...channelContract,
        functionName: 'symbol',
      }),
      zeroAddress,
      // this.client.readContract({
      //   ...channelContract,
      //   functionName: 'owner',
      // }),
    ])

    return {
      name,
      symbol,
      owner,
      address: channelAddress,
    }
  }

  async getChannelOwnerById({ id }: { id: Address }) {
    return zeroAddress
    // const owner = await this.client.readContract({
    //   abi: channelAbi,
    //   address: id,
    //   functionName: 'owner',
    // })

    // return owner
  }

  async getLastArticleId(channelAddress: Address) {
    try {
      const lastPublicationId = await this.client.readContract({
        abi: channelAbi,
        address: channelAddress,
        functionName: 'currentID',
        args: [],
      })

      return lastPublicationId
    } catch (error) {
      return BigInt(0)
    }
  }

  async isUserFollowingChannel(channelAddress: Address, userAddress: Address): Promise<boolean> {
    const supabase = await createClient()

    const { data } = await supabase
      .from('behavior_follow')
      .select()
      .eq('user_address', userAddress)
      .eq('channel_address', channelAddress)

    return !!data?.length
  }

  async followChannel(channelAddress: Address, userAddress: Address): Promise<boolean> {
    const supabase = await createClient()

    // TODO: fix this
    // const { status, error } = await supabase.from('behavior_follow').insert({
    // user_address: userAddress,
    // channel_address: channelAddress,
    // })

    const { status, error } = { status: 500, error: { message: 'Temp disabled feature' } }

    if (error) {
      throw new SupabaseError(error.message)
    }

    return status === SUPABASE_STATUSES.SUCCESS
  }

  async unfollowChannel(channelAddress: Address, userAddress: Address): Promise<boolean> {
    const supabase = await createClient()

    const { status, error } = await supabase
      .from('behavior_follow')
      .delete()
      .eq('user_address', userAddress)
      .eq('channel_address', channelAddress)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return status === SUPABASE_STATUSES.DELETE_SUCCESS
  }

  async getFollowedChannels(userAddress: Address) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('behavior_follow')
      .select('channel_address')
      .eq('user_address', userAddress)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data
  }

  async getFollowers(channelAddress: Address) {
    const supabase = await createClient()

    const { data: followers, error } = await supabase
      .from('behavior_follow')
      .select('user_address')
      .eq('channel_address', channelAddress)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return followers
  }

  async getFollowersCount(channelAddress: Address) {
    const supabase = await createClient()

    const { count } = await supabase
      .from('behavior_follow')
      .select('*', { count: 'exact', head: true })
      .eq('channel_address', channelAddress)

    return count || 0
  }

  async addChannelNotifications(notifications: { channel_address: string; user_address: string }[]): Promise<boolean> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('channel_notifications')
      .upsert(notifications, { onConflict: 'user_address,channel_address' })
      .select()

    if (error) {
      throw new SupabaseError(error.message)
    }

    return !!data.length
  }

  async markChannelAsRead(userAddress: Address, channelAddress: Address): Promise<boolean> {
    const supabase = await createClient()

    const result = await supabase
      .from('channel_notifications')
      .delete()
      .eq('user_address', userAddress)
      .eq('channel_address', channelAddress)

    return result.status === SUPABASE_STATUSES.DELETE_SUCCESS
  }

  async getChannelRequests() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('channel_requests')
      .select('channel_address, channel_owner, status, created_at')
      .eq('environment', process.env.NODE_ENV)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data
  }

  async addChannelRequest(
    channelAddress: Address,
    channelOwner: Address,
    status: ChannelRequest['status'] = 'pending',
  ) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('channel_requests')
      .upsert(
        {
          channel_address: channelAddress,
          channel_owner: channelOwner,
          status,
          environment: process.env.NODE_ENV,
        },
        { onConflict: 'channel_address,channel_owner,environment' },
      )
      .eq('environment', process.env.NODE_ENV)
      .select('channel_address, channel_owner, status, created_at')
      .limit(1)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data[0]
  }

  async blacklistChannelRequest(channelAddress: Address) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('channel_requests')
      .update({ status: 'blacklisted' })
      .eq('channel_address', channelAddress)
      .eq('environment', process.env.NODE_ENV)
      .select('channel_address, channel_owner, status, created_at')

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data[0]
  }

  async whitelistChannelRequest(channelAddress: Address) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('channel_requests')
      .update({ status: 'whitelisted' })
      .eq('channel_address', channelAddress)
      .eq('environment', process.env.NODE_ENV)
      .select('channel_address, channel_owner, status, created_at')

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data[0]
  }

  async getWhitelistedChannelAddresses(): Promise<Address[]> {
    const addresses = await this.client.readContract({
      abi: mediaPlatformAbi,
      functionName: 'whitelistedChannelsList',
      address: contracts.mediaPlatform,
    })

    return addresses as Address[]
  }

  async getAllChannelAddresses(): Promise<Address[]> {
    const addresses = await this.client.readContract({
      abi: channelLedgerAbi,
      functionName: 'allChannels',
      address: contracts.channelLedger,
    })

    return addresses as Address[]
  }

  async getOtherChannelRequests() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('channel_requests')
      .select('channel_address, channel_owner, status, created_at')
      .neq('status', 'whitelisted')
      .eq('environment', process.env.NODE_ENV)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data
  }

  async getFollowingChannels(userAddress: Address) {
    const followedChannels = await this.client.readContract({
      abi: followChannelsAbi,
      functionName: 'followedChannelsList',
      address: contracts.followChannels,
      account: userAddress,
    })

    return followedChannels as Address[]
  }
}
