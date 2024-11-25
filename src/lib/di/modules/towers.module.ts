import { Container } from '@evyweb/ioctopus'
import { DI_SYMBOLS } from '../types'
import { TowersRepository } from '@/repositories/server/towers.repository'

export function registerTowersModule(container: Container) {
  container.bind(DI_SYMBOLS.ITowersRepository).toClass(TowersRepository, []) // Pass services here
}
