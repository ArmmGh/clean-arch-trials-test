import { ContainerModule, interfaces } from 'inversify'
import { DI_SYMBOLS } from '../types'
import { IArticlesRepository } from '@/use-cases/interfaces/IArticlesRepository.interface'
import { ArticlesRepository } from '@/repositories/Articles.repository'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    // bind<ITransactionManagerService>(DI_SYMBOLS.ITransactionManagerService).to(MockTransactionManagerService)
  } else {
    bind<IArticlesRepository>(DI_SYMBOLS.IArticlesRepository).to(ArticlesRepository)
  }
}

export const ArticlesModule = new ContainerModule(initializeModule)
