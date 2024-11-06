'use server'

import { Address, getAddress, Hash } from 'viem'
import { withAdminAuth } from '@/app/actions/utils/with-admin-auth.util'
import { revalidatePath } from 'next/cache'
import { InputParseError, SupabaseError } from '@/entities/errors/common'
import blacklistChannelController from '@/controllers/admin/blacklist-channel.controller'

export default async function blacklistChannelAction(txHash: Hash, channelAddress: Address) {
  return withAdminAuth(async ({ address: sessionAddress }) => {
    try {
      await blacklistChannelController({ txHash, channelAddress }, getAddress(sessionAddress))
    } catch (error) {
      if (error instanceof SupabaseError || error instanceof InputParseError) {
        console.log('Error in blacklistChannelAction: ', error.message, error.cause)
      }

      return { error: true }
    } finally {
      revalidatePath('/admin')
    }

    return { success: true }
  })
}
