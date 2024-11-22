import { IArticlesRepository } from '@/use-cases/interfaces/IArticlesRepository.interface'
import { IBehaviorsRepository } from '@/use-cases/interfaces/behaviors-repository.interface'
import { IChannelsRepository } from '@/use-cases/interfaces/channels-repository.interface'
import { IPublicationsRepository } from '@/use-cases/interfaces/publications-repository.interface'

export const DI_SYMBOLS = {
  // Repositories
  IArticlesRepository: Symbol.for('IArticlesRepository'),
  IChannelsRepository: Symbol.for('IChannelsRepository'),
  IPublicationsRepository: Symbol.for('IPublicationsRepository'),
  IBehaviorsRepository: Symbol.for('IBehaviorsRepository'),
}

export interface DI_RETURN_TYPES {
  IArticlesRepository: IArticlesRepository
  IChannelsRepository: IChannelsRepository
  IPublicationsRepository: IPublicationsRepository
  IBehaviorsRepository: IBehaviorsRepository
}
