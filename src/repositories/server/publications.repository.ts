import { SupabaseError } from '@/entities/errors/common'
import { createClient } from '@/lib/utils/supabase/server'
import { createViemClient } from '@/lib/utils/viemClient'
import { IPublicationsRepository } from '@/use-cases/interfaces/publications-repository.interface'
import { PublicClient } from 'viem'

export class PublicationsRepository implements IPublicationsRepository {
  private client: PublicClient
  private envType: typeof process.env.NODE_ENV

  constructor() {
    this.client = createViemClient()
    this.envType = process.env.NODE_ENV
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
}
