import { IArticlesRepository } from '@/use-cases/interfaces/IArticlesRepository.interface'
import { IChannelsRepository } from '@/use-cases/interfaces/IChannelsRepository.interface'

export const DI_SYMBOLS = {
  // Repositories
  IArticlesRepository: Symbol.for('IArticlesRepository'),
  IChannelsRepository: Symbol.for('IChannelsRepository'),
}

export interface DI_RETURN_TYPES {
  IArticlesRepository: IArticlesRepository
  IChannelsRepository: IChannelsRepository
}
