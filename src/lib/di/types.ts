import { IArticlesRepository } from '@/use-cases/interfaces/IArticlesRepository.interface'
import { IChannelsRepository } from '@/use-cases/interfaces/IChannelsRepository.interface'

// Use interface names as tokens, matching your previous pattern
export const TOKENS = {
  IArticlesRepository: 'IArticlesRepository',
  IChannelsRepository: 'IChannelsRepository',
} as const

export type TokenType = typeof TOKENS
export type TokenKeys = keyof TokenType

// Define the context type that maps tokens to their types
export interface DIContext {
  [TOKENS.IArticlesRepository]: IArticlesRepository
  [TOKENS.IChannelsRepository]: IChannelsRepository
}
