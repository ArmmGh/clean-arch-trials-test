import { Container } from '@evyweb/ioctopus'
import { DI_SYMBOLS } from '../types'
import { PublicationsRepository } from '@/repositories/server/publications.repository'

export function registerPublicationsModule(container: Container) {
  container.bind(DI_SYMBOLS.IPublicationsRepository).toClass(PublicationsRepository, []) // Pass services here
}
