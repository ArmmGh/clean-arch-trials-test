import { ContainerModule, interfaces } from 'inversify'
import { DI_SYMBOLS } from '../types'
import { ChannelsRepository } from '@/repositories/Channels.repository'
import { IChannelsRepository } from '@/use-cases/interfaces/IChannelsRepository.interface'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    // bind<ITransactionManagerService>(DI_SYMBOLS.ITransactionManagerService).to(MockTransactionManagerService)
  } else {
    bind<IChannelsRepository>(DI_SYMBOLS.IChannelsRepository).to(ChannelsRepository)
  }
}

export const ChannelsModule = new ContainerModule(initializeModule)
