import { Container } from 'inversify'

import { DI_RETURN_TYPES, DI_SYMBOLS } from './types'
import { ChannelsModule } from './modules/channels.module'
import { ArticlesModule } from './modules/articles.module'

const ApplicationContainer = new Container({
  defaultScope: 'Singleton',
})

export const initializeContainer = () => {
  ApplicationContainer.load(ChannelsModule)
  ApplicationContainer.load(ArticlesModule)
}

export const destroyContainer = () => {
  ApplicationContainer.unload(ChannelsModule)
  ApplicationContainer.unload(ArticlesModule)
}

if (process.env.NODE_ENV !== 'test') {
  initializeContainer()
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol])
}

export { ApplicationContainer }
