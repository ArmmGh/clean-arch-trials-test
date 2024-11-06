'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { checkAuth } from '@/app/actions/utils/with-admin-auth.util'
import logoutAdmin from '@/app/actions/admin/admin-logout.action'
import { Admin } from '@/entities/types/admin/index.type'

export function useAuth() {
  const { address } = useAccount()
  const router = useRouter()
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const verifyAuth = async () => {
      try {
        setIsLoading(true)
        const adminData = await checkAuth()

        if (!mounted) return

        // If we have admin data but address doesn't match, logout
        if (adminData && address && adminData.address.toLowerCase() !== address.toLowerCase()) {
          await logoutAdmin()
          setAdmin(null)
          router.push('/admin/login')
          return
        }

        setAdmin(adminData)
      } catch (error) {
        setAdmin(null)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    verifyAuth()

    return () => {
      mounted = false
    }
  }, [address])

  return {
    address,
    isAdmin: !!admin,
    admin,
    isLoading,
  }
}
