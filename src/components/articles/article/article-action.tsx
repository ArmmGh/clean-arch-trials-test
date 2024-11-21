import { ReactNode } from 'react'

export default function Action({ children }: { children: ReactNode }) {
  return <div className='flex cursor-not-allowed items-center gap-1 text-xs font-medium text-slate-700'>{children}</div>
}
