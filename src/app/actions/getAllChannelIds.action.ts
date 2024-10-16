'use server'

import { getAllChannelIdsUseCase } from '@/use-cases/get-all-channel-ids.use-case'
import { Address, ContractFunctionExecutionError } from 'viem'

export default async function getAllChannelIdsAction({ publisherAddress }: { publisherAddress: Address }) {
  try {
    const ids = await getAllChannelIdsUseCase(publisherAddress)
    return ids
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      console.error(error.cause.shortMessage)
    }

    return []
    // throw new Error('Failed to get channel IDs')
  }
}
