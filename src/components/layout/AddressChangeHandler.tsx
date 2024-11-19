'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const eventsToTriggerRefresh = ['sign-in', 'sign-out']

export default function AddressChangeHandler() {
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) return

      if (eventsToTriggerRefresh.includes(event.data.type)) {
        router.refresh()
      }
    })

    return () => {
      window.removeEventListener('message', () => {})
    }
  }, [router])

  return null
}
