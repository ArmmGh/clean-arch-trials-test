'use server'

import { UnauthorizeError } from '@/entities/errors/common'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/utils/supabase/server'
import { createAdminSession, VerifyAdminParams, verifyAdminSignature } from './utils'

export default async function adminLoginAction({ address, signature, message }: VerifyAdminParams): Promise<boolean> {
  try {
    const env = process.env.NODE_ENV

    // First verify the signature
    const supabase = await createClient()
    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('address', address)
      .eq('environment', env)
      .single()

    if (!admin) {
      throw new UnauthorizeError('Unauthorized')
    }

    const isValid = await verifyAdminSignature(address, message, signature)

    if (!isValid) {
      throw new UnauthorizeError('Invalid signature')
    }

    const sessionToken = await createAdminSession(address)

    const cookiesData = await cookies()
    cookiesData.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })
  } catch (error) {
    console.error('Error verifying admin:', error)
    return false
  }

  return true
}
