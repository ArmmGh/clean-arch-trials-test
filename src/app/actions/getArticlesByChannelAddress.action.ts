'use server'

import { InputParseError } from '@/entities/errors/common'
import getArticlesByChannelAddressUseCase from '@/use-cases/get-articles-by-channel-address.use-case'
import { ContractFunctionExecutionError, isAddress } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  channelAddress: z.string().refine((val) => isAddress(val), { message: 'Invalid Channel address' }),
})

export default async function getArticlesByChannelAddressAction(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new Error(inputParseError.message, { cause: inputParseError })
    }

    const articles = await getArticlesByChannelAddressUseCase(data.channelAddress)

    return articles
  } catch (error) {
    console.error(error)

    if (error instanceof InputParseError || error instanceof ContractFunctionExecutionError) {
      console.error(error.message)

      return []
    }

    return []
  }
}
