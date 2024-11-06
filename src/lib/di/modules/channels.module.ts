import { Container } from '@evyweb/ioctopus'
import { DI_SYMBOLS } from '../types'
import { ChannelsRepository } from '@/repositories/Channels.repository'

export function registerChannelsModule(container: Container) {
  container.bind(DI_SYMBOLS.IChannelsRepository).toClass(ChannelsRepository, []) // Pass services here
}
