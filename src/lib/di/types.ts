import { IChannelsRepository } from '@/use-cases/interfaces/IChannelsRepository.interface'

export const DI_SYMBOLS = {
  // Repositories
  IChannelsRepository: Symbol.for('IChannelsRepository'),
}

export interface DI_RETURN_TYPES {
  // Repositories
  IChannelsRepository: IChannelsRepository
}
