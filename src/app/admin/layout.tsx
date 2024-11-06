'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/use-auth'

export default function AdminLayout(props: { children: ReactNode }) {
  // TODO: maybe create and move to guard provider
  useAuth()

  return <div>{props.children}</div>
}
