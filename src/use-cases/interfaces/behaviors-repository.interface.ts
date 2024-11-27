import { BehaviorFollowRow, BehaviorRow, EntityType } from '@/entities/types/behaviors'
import { Address } from 'viem'

export interface IBehaviorsRepository {
  getBehaviorByConsumerAddress(address: Address): Promise<BehaviorRow | null>
  getBehaviorFollowByEntity(entityType: EntityType, entityId: number, behaviorId: number): Promise<BehaviorFollowRow>
  getUserBehaviorTokenId(address: Address): Promise<bigint>
}
