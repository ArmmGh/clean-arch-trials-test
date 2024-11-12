'use server'

import { InputParseError, SupabaseError } from '@/entities/errors/common'
import getFollowedChannelsUseCase from '@/use-cases/get-followed-channels.use-case'
import { Address, getAddress, isAddress } from 'viem'
import { z } from 'zod'

const inputSchema = z.string().refine((addrs) => isAddress(addrs))

function presenter(
  channels: {
    channel_address: string | null
  }[],
) {
  return channels.reduce<Address[]>((acc, { channel_address }) => {
    if (channel_address !== null) {
      acc.push(getAddress(channel_address))
    }

    return acc
  }, [])
}

export default async function getFollowedChannelsAction(userAddress: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(userAddress)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message, inputParseError)
    }

    const followedChannelsAddresses = await getFollowedChannelsUseCase(data)

    return presenter(followedChannelsAddresses)
  } catch (error) {
    if (error instanceof InputParseError || error instanceof SupabaseError) {
      console.error(error.message)

      return []
    }

    console.error(error)
    return []
  }
}
