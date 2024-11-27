import 'server-only'

import { SupabaseError } from '@/entities/errors/common'
import { EntityType } from '@/entities/types/behaviors'
import { createClient } from '@/lib/utils/supabase/server'
import { createViemClient } from '@/lib/utils/viemClient'
import { IBehaviorsRepository } from '@/use-cases/interfaces/behaviors-repository.interface'
import { Address, PublicClient } from 'viem'
import { readBehaviorGetTokenIdsOfUser, readBehaviorUserToTokenIds } from '@/generated'
import { config } from '@/lib/config/wagmi'

export class BehaviorsRepository implements IBehaviorsRepository {
  // private client: PublicClient

  constructor() {
    // this.client = createViemClient()
  }

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

  async getUserBehaviorTokenId(address: Address) {
    const defaultBehaviorIndex = 0
    const tokenIds = await readBehaviorGetTokenIdsOfUser(config, { args: [address] })

    return tokenIds[defaultBehaviorIndex]
  }

  async getAction(tokenId: number, actionType: ActionsEnum, entityType: EntityType) {}
}

enum ActionsEnum {
  LIKE,
  FOLLOW,
}
