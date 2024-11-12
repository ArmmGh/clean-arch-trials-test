// TODO: move to authService maybe
import { createClient } from '@/lib/utils/supabase/server'
import { Address, getAddress, Hash, verifyMessage } from 'viem'

export type VerifyAdminParams = {
  address: Address
  signature: Hash
  message: string // we'll verify this message contains current timestamp
}

async function validateAdminSession(sessionToken: string) {
  const supabase = await createClient()

  const { data: admin } = await supabase
    .from('admins')
    .select('*')
    .eq('session_token', sessionToken)
    .eq('environment', process.env.NODE_ENV)
    .single()

  if (!admin || !admin.session_expiry || new Date(admin.session_expiry) < new Date()) {
    return null
  }

  return admin
}

async function generateSecureToken(length: number = 32): Promise<string> {
  const buffer = new Uint8Array(length)
  crypto.getRandomValues(buffer)
  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function createAdminSession(address: string): Promise<string> {
  const sessionToken = await generateSecureToken()
  const now = new Date()
  const sessionExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours

  const supabase = await createClient()

  await supabase
    .from('admins')
    .update({
      session_token: sessionToken,
      session_expiry: sessionExpiry.toISOString(),
      last_login: now.toISOString(),
    })
    .eq('address', address)
    .eq('environment', process.env.NODE_ENV)

  return sessionToken
}

async function verifyAdminSignature(
  address: VerifyAdminParams['address'],
  message: VerifyAdminParams['message'],
  signature: VerifyAdminParams['signature'],
): Promise<boolean> {
  try {
    const isVerified = await verifyMessage({
      address: getAddress(address),
      message,
      signature,
    })

    return isVerified
  } catch {
    return false
  }
}

export { validateAdminSession, generateSecureToken, createAdminSession, verifyAdminSignature }
