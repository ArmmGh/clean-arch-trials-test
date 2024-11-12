import { Container } from '@evyweb/ioctopus'
import { DI_SYMBOLS } from '../types'
import { ArticlesRepository } from '@/repositories/server/Articles.repository'

export function registerArticlesModule(container: Container) {
  container.bind(DI_SYMBOLS.IArticlesRepository).toClass(ArticlesRepository, []) // Pass services here
}
