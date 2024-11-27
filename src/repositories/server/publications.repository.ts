import { SupabaseError } from '@/entities/errors/common'
import { readChannelCurrentId, readChannelTokenUri } from '@/generated'
import { config } from '@/lib/config/wagmi'
import { createClient } from '@/lib/utils/supabase/server'
import { IPublicationsRepository } from '@/use-cases/interfaces/publications-repository.interface'
import { create, KuboRPCClient } from 'kubo-rpc-client'
import { Address } from 'viem'

export class PublicationsRepository implements IPublicationsRepository {
  private kuboClient: KuboRPCClient

  constructor() {
    this.kuboClient = create({
      host: process.env.KUBO_HOST,
      port: process.env.KUBO_PORT,
      protocol: process.env.KUBO_PROTOCOL,
    })
  }

  async getPublicationTokenUri(channelAddress: Address, publicationIndex: bigint) {
    const tokenUri = await readChannelTokenUri(config, { address: channelAddress, args: [publicationIndex] })

    return tokenUri
  }

  async getLastPublicationIndexByChannel(channelAddress: Address) {
    const currentId = readChannelCurrentId(config, { address: channelAddress })

    return currentId
  }

  async getPublicationsByChannelId(channelId: number) {
    const supabase = await createClient()

    const { data: publications, error } = await supabase.from('publications').select().eq('channel_id', channelId)
    // .eq('env_type', this.envType)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return publications
  }

  async getContentByCID(cid: string) {
    const content = this.kuboClient.cat(cid)

    return content
  }
}
