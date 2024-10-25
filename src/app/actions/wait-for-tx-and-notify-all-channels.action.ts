'use server'

import { InputParseError } from '@/entities/errors/common'
import waitForTxAndNotifyAllChannelsUseCase from '@/use-cases/wait-for-tx-and-notify-all-channels.use-case'

import { Address, isAddress, isHash } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  hash: z.string().refine((value) => isHash(value)),
  channelAddress: z.string().refine((value) => isAddress(value)),
})

export default async function waitForTxAndNotifyAllChannelsAction(hash: Address, channelAddress: Address) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse({ hash, channelAddress })

    if (inputParseError) {
      throw new InputParseError(inputParseError.message)
    }

    const isSuccess = await waitForTxAndNotifyAllChannelsUseCase(data.hash, data.channelAddress)

    return { success: isSuccess }
  } catch (err) {
    if (err instanceof InputParseError) {
      console.error(err.message)

      return { error: err.message }
    }

    console.error(err)
    return { error: 'Error while waiting for transaction' }
  }
}
