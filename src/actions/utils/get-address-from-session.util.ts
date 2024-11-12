import { authConfig } from '@/app/api/auth/[...nextauth]/auth-config'
import { getServerSession } from 'next-auth'
import { Address, isAddress } from 'viem'

export default async function getAddressFromSession(): Promise<Address | undefined> {
  const session = await getServerSession(authConfig)

  const isValidAddress = session?.address && isAddress(session.address)

  return isValidAddress ? session.address : undefined
}
