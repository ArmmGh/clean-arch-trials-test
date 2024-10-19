import { getAddress } from 'viem'

export const contracts = {
  factoryAddress: getAddress(process.env.NEXT_PUBLIC_FACTORY_ADDRESS!),
  metadataAttributes: getAddress(process.env.NEXT_PUBLIC_METADATA_ATTRIBUTES_ADDRESS!),
}
