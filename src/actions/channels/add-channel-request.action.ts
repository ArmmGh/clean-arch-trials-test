'use server'

import { InputParseError, SupabaseError, UnauthenticatedError } from '@/entities/errors/common'
import AddChannelRequestController from '@/controllers/channels/add-channel-request.controller'
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import { Hash } from 'viem'

export default async function AddChannelRequestAction(hash: Hash) {
  try {
    const cookiesData = await cookies()
    // TODO: requester should be owner of the channel (maybe this is temp solution)
    const address = getPublisherAddressFromSession(cookiesData)

    if (!address) {
      throw new UnauthenticatedError('Unauthenticated')
    }

    await AddChannelRequestController(hash)
  } catch (error) {
    if (error instanceof InputParseError || error instanceof SupabaseError) {
      console.error('Error in AddChannelRequestAction:', error.cause, error.message)
    } else {
      console.error('Error in AddChannelRequestAction:', error)
    }

    return { error }
  }

  return { success: true }
}
