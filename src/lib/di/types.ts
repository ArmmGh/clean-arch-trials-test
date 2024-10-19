import { IArticlesRepository } from '@/use-cases/interfaces/IArticlesRepository.interface'
import { IChannelsRepository } from '@/use-cases/interfaces/IChannelsRepository.interface'

export const DI_SYMBOLS = {
  // Repositories
  IChannelsRepository: Symbol.for('IChannelsRepository'),
  IArticlesRepository: Symbol.for('IArticlesRepository'),
}

export interface DI_RETURN_TYPES {
  // Repositories
  IChannelsRepository: IChannelsRepository
  IArticlesRepository: IArticlesRepository
}
