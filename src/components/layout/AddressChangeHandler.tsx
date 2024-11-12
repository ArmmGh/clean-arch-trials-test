'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

const SECURE_PATHS = ['/dashboard'] as const
const PUBLIC_REDIRECT = '/' as const

export default function AddressChangeHandler({ serverAddress }: { serverAddress?: Address }) {
  const { address } = useAccount()
  const router = useRouter()
  const pathname = usePathname()

  // const addressChanged = address !== serverAddress

  useEffect(() => {
    if (address !== serverAddress) {
      router.replace(PUBLIC_REDIRECT)
      router.refresh()
    }
  }, [serverAddress, address, router])

  useEffect(() => {
    if (!address && SECURE_PATHS.includes(pathname as (typeof SECURE_PATHS)[number])) {
      router.replace(PUBLIC_REDIRECT)
      router.refresh()
    }
  }, [address, pathname, router])

  return null
}
