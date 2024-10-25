'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

const securePaths = ['/dashboard']

export default function AddressChangeHandler() {
  const { address } = useAccount()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!address && securePaths.includes(pathname)) {
      router.replace('/')
    }

    router.refresh()
  }, [address])

  return null
}
