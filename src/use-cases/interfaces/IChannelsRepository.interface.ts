import { Address } from 'viem'

export interface IChannelsRepository {
  getAllChannelIds({ publisherAddress }: { publisherAddress: Address }): Promise<Address[]>
  getChannelById({ id }: { id: Address }): Promise<{ name: string; symbol: string; owner: string }>
  getChannelOwnerById({ id }: { id: Address }): Promise<any>
  getArticleById({ channelId, id }: { channelId: Address; id: bigint }): Promise<any>
  getArticlesCountByChannelId({
    id,
    publisherAddress,
  }: {
    id: string | Address
    publisherAddress: string | Address
  }): Promise<any>
}
