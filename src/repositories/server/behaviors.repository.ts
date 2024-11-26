import { SupabaseError } from '@/entities/errors/common'
import { EntityType } from '@/entities/types/behaviors'
import { createClient } from '@/lib/utils/supabase/server'
import { IBehaviorsRepository } from '@/use-cases/interfaces/behaviors-repository.interface'
import { Address } from 'viem'

export class BehaviorsRepository implements IBehaviorsRepository {
  constructor() {}

  async getBehaviorByConsumerAddress(address: Address) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('behaviors')
      .select()
      .eq('consumer_address', address)
      .limit(1)
      .maybeSingle()

    if (error) {
      throw new SupabaseError(error.message, { cause: error.cause })
    }

    return data
  }

  async getBehaviorFollowByEntity(entityType: EntityType = 'Channel', entityId: number, behaviorId: number) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('behavior_follow')
      .select()
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .eq('behavior_id', behaviorId)
      .limit(1)
      .single()

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data
  }
}
