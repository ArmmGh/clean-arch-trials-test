'use server'

import { Address, getAddress } from 'viem'
import { withAdminAuth } from '@/app/actions/utils/with-admin-auth.util'
import { revalidatePath } from 'next/cache'
import markChannelAsBlacklistedController from '@/controllers/admin/mark-channel-as-blacklisted.controller'

export default async function markChannelAsBlacklistedAction(channel: Address) {
  return withAdminAuth(async ({ address }) => {
    try {
      await markChannelAsBlacklistedController({ channel }, getAddress(address))
    } catch (error) {
      console.log('Error in markChannelAsBlacklistedAction: ', error)

      return { error: true }
    } finally {
      revalidatePath('/admin')
    }

    return { success: true }
  })
}
