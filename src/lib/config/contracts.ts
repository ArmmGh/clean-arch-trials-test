import { getAddress } from 'viem'

export const contracts = {
  factoryAddress: getAddress(process.env.NEXT_PUBLIC_FACTORY_ADDRESS!),
  // otherContractAddress: process.env.NEXT_PUBLIC_OTHER_CONTRACT_ADDRESS,
}
