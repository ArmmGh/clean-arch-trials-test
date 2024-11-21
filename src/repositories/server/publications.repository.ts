import { SupabaseError } from '@/entities/errors/common'
import { createClient } from '@/lib/utils/supabase/server'
import { createViemClient } from '@/lib/utils/viemClient'
import { IPublicationsRepository } from '@/use-cases/interfaces/publications-repository.interface'
import { PublicClient } from 'viem'

export class PublicationsRepository implements IPublicationsRepository {
  private client: PublicClient

  constructor() {
    this.client = createViemClient()
  }

  async getPublicationsByChannelId(channelId: number) {
    const supabase = await createClient()

    const { data: publications, error } = await supabase.from('publications').select().eq('channel_id', channelId)

    if (error) {
      throw new SupabaseError(error.message)
    }

    return publications
  }
}
