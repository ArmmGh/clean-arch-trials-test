import { PublicationRow } from '@/entities/models/publication'

export interface IPublicationsRepository {
  getPublicationsByChannelId(channelId: number): Promise<PublicationRow[]>
}
