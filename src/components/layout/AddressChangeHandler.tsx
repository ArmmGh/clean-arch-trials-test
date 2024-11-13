'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Address } from 'viem'
import { useAppKitAccount } from '@reown/appkit/react'

const SECURE_PATHS = ['/dashboard'] as const
const PUBLIC_REDIRECT = '/' as const

export default function AddressChangeHandler({ serverAddress }: { serverAddress?: Address }) {
  const { address, isConnected } = useAppKitAccount()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isConnected && address !== serverAddress) {
      router.replace(PUBLIC_REDIRECT)
      router.refresh()
    }
  }, [serverAddress, address, router, isConnected])

  useEffect(() => {
    if (!address && SECURE_PATHS.includes(pathname as (typeof SECURE_PATHS)[number])) {
      router.replace(PUBLIC_REDIRECT)
      router.refresh()
    }
  }, [address, pathname, router])

  return null
}
