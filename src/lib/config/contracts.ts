import { getAddress } from 'viem'

export const contracts = {
  factoryAddress: getAddress(process.env.NEXT_PUBLIC_FACTORY_ADDRESS!),
  metadataAttributes: getAddress(process.env.NEXT_PUBLIC_METADATA_ATTRIBUTES_ADDRESS!),
  mediaPlatform: getAddress(process.env.NEXT_PUBLIC_MEDIA_PLATFORM_ADDRESS!),
  channelLedger: getAddress(process.env.NEXT_PUBLIC_CHANNEL_LEDGER_ADDRESS!),
  mainTower: getAddress(process.env.NEXT_PUBLIC_MAIN_TOWER_ADDRESS!),
  followChannels: getAddress(process.env.NEXT_PUBLIC_FOLLOW_CHANNELS_ADDRESS!),
  // V2
  behavior: getAddress(process.env.NEXT_PUBLIC_BEHAVIOR_ADDRESS!),
}
