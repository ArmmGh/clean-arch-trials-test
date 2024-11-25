import { createContainer } from '@evyweb/ioctopus'
import { registerChannelsModule } from './modules/channels.module'
import { registerArticlesModule } from './modules/articles.module'
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types'
import { registerPublicationsModule } from './modules/publications.module'
import { registerBehaviorsModule } from './modules/behaviors.module'
import { registerTowersModule } from './modules/towers.module'

const ApplicationContainer = createContainer()

registerChannelsModule(ApplicationContainer)
registerArticlesModule(ApplicationContainer)
registerPublicationsModule(ApplicationContainer)
registerBehaviorsModule(ApplicationContainer)
registerTowersModule(ApplicationContainer)

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol])
}
