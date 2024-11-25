import { SupabaseError } from '@/entities/errors/common'
import {
  readMainTowerMinPrice,
  readMainTowerOldestTrackedBlock,
  readMainTowerPrice,
  readMainTowerTotalAnnouncementsInWindow,
  readMainTowerWindowSize,
} from '@/generated'
import { config } from '@/lib/config/wagmi'
import { createClient } from '@/lib/utils/supabase/server'
import { ITowersRepository } from '@/use-cases/interfaces/towers-repository.interface'
import { Address } from 'viem'

export class TowersRepository implements ITowersRepository {
  constructor() {}

  async getTowerRows() {
    const supabase = await createClient()

    const { data, error } = await supabase.from('towers').select('*')

    if (error) {
      throw new SupabaseError(error.message)
    }

    return data
  }

  async getTowerInContract(towerAddress: Address) {
    const [
      announcementsPerBlock,
      price,
      minPrice,
      priceIncrease,
      windowSize,
      oldestTrackedBlock,
      totalAnnouncementsInWindow,
    ] = await Promise.all([
      BigInt(0),
      readMainTowerPrice(config, { address: towerAddress }),
      readMainTowerMinPrice(config, { address: towerAddress }),
      readMainTowerMinPrice(config, { address: towerAddress }),
      readMainTowerWindowSize(config, { address: towerAddress }),
      readMainTowerOldestTrackedBlock(config, { address: towerAddress }),
      readMainTowerTotalAnnouncementsInWindow(config, { address: towerAddress }),
    ])

    return {
      announcementsPerBlock,
      price,
      minPrice,
      priceIncrease,
      windowSize,
      oldestTrackedBlock,
      totalAnnouncementsInWindow,
    }
  }

  async getTowerShotsCount(towerAddress: Address) {
    const supabase = await createClient()

    const { data, error } = await supabase.from('announcements').select().eq('tower_address', towerAddress)

    if (error) {
      throw new SupabaseError(error.message)
    }

    data

    return data.length
  }
}
