import { createInjector, Scope } from 'typed-inject'
import { DIContext, TOKENS } from './types'
import { ArticlesRepository } from '@/repositories/Articles.repository'
import { ChannelsRepository } from '@/repositories/Channels.repository'

// Create and configure the injector
let injector = createInjector()
  .provideClass(TOKENS.IArticlesRepository, ArticlesRepository, Scope.Singleton)
  .provideClass(TOKENS.IChannelsRepository, ChannelsRepository, Scope.Singleton)

// Export a getter function for dependencies
export function getInjection<K extends keyof DIContext>(token: K): DIContext[K] {
  try {
    return injector.resolve(token)
  } catch (error) {
    throw new Error(`Failed to resolve dependency for token ${token}: ${error}`)
  }
}
