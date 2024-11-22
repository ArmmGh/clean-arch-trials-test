import { Container } from '@evyweb/ioctopus'
import { DI_SYMBOLS } from '../types'
import { BehaviorsRepository } from '@/repositories/server/behaviors.repository'

export function registerBehaviorsModule(container: Container) {
  container.bind(DI_SYMBOLS.IBehaviorsRepository).toClass(BehaviorsRepository, []) // Pass services here
}
