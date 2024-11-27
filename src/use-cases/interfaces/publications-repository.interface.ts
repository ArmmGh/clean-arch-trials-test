import { PublicationRow } from '@/entities/models/publication'
import { Address } from 'viem'

export interface IPublicationsRepository {
  getPublicationsByChannelId(channelId: number): Promise<PublicationRow[]>
  getLastPublicationIndexByChannel(channelAddress: Address): Promise<bigint>
  getPublicationTokenUri(channelAddress: Address, publicationIndex: bigint): Promise<string>
  getContentByCID(cid: string): Promise<AsyncIterable<Uint8Array>>
}
