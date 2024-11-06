'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/utils/supabase/server'
import { withAdminAuth } from '@/app/actions/utils/with-admin-auth.util'

export async function logoutAdmin() {
  return withAdminAuth(async (admin) => {
    try {
      const cookieStore = await cookies()
      const sessionToken = cookieStore.get('admin-session')?.value

      if (sessionToken) {
        const supabase = await createClient()
        await supabase
          .from('admins')
          .update({
            session_token: null,
            session_expiry: null,
          })
          .eq('address', admin.address) // Use admin's address for extra security
          .eq('environment', process.env.NODE_ENV)
      }

      cookieStore.delete('admin-session')

      return true
    } catch (error) {
      console.error('Error logging out:', error)
      throw new Error('Failed to logout')
    }
  })
}

export default logoutAdmin
