'use server'

import getAllChannelsUseCase from '@/use-cases/get-all-channels.use-case'
import { ContractFunctionExecutionError, ContractFunctionZeroDataError } from 'viem'

export default async function getAllChannelsAction() {
  try {
    const channels = await getAllChannelsUseCase()

    return channels
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      console.error(error.cause.shortMessage)
      console.error(error.cause.stack)
    } else if (error instanceof ContractFunctionZeroDataError) {
      console.error(error.shortMessage)
    } else {
      console.error(error)
    }

    return []
  }
}
