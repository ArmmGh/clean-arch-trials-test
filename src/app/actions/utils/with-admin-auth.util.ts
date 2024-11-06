'use server'

import { cookies } from 'next/headers'
import { AuthorizeError } from '@/entities/errors/common'
import { createClient } from '@/lib/utils/supabase/server'
import { Admin } from '@/entities/types/admin/index.type'

// Fix using our architecture
export async function checkAuth(): Promise<Admin> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin-session')?.value

    if (!sessionToken) {
      throw new AuthorizeError('No session found')
    }

    const supabase = await createClient()
    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('session_token', sessionToken)
      .eq('environment', process.env.NODE_ENV)
      .single()

    if (!admin || !admin.session_expiry || new Date(admin.session_expiry) < new Date()) {
      throw new AuthorizeError('Invalid or expired session')
    }

    return admin
  } catch (error) {
    throw new AuthorizeError('Authentication failed')
  }
}

// Utility function for wrapping admin-only server actions
export async function withAdminAuth<T>(action: (admin: Admin) => Promise<T>): Promise<T> {
  const admin = await checkAuth()

  return action(admin)
}
