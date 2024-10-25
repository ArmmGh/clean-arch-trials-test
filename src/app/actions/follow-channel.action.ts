'use server'

import { InputParseError, SupabaseError } from '@/entities/errors/common'
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import followChannelUseCase from '@/use-cases/follow-channel.use-case'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { getAddress, isAddress } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  channelAddress: z.string(),
  clientUserAddress: z.string().refine((addrs) => isAddress(addrs)),
})

export default async function followChannelAction(input: z.infer<typeof inputSchema>) {
  try {
    const serverUserAddress = getPublisherAddressFromSession(cookies())

    if (!serverUserAddress) {
      throw new Error('No user address found in session')
    }

    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message, inputParseError)
    }

    const success = await followChannelUseCase(
      getAddress(data.channelAddress),
      getAddress(data.clientUserAddress),
      getAddress(serverUserAddress),
    )

    if (!success) {
      throw new Error()
    }

    revalidatePath('/')
    return { success }
  } catch (error) {
    if (error instanceof InputParseError || error instanceof SupabaseError) {
      console.error(error.message)
      return { error: error.message }
    }

    console.error(error)
    return { error: 'Failed to follow channel' }
  }
}
