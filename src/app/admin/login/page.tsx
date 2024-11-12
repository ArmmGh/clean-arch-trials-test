'use client'

import { useAccount, useSignMessage } from 'wagmi'
import { useRouter } from 'next/navigation'
import ConnectWallet from '@/components/connect-wallet'
import adminLoginAction from '@/actions/admin/admin-login.action'
import { useToast } from '@/hooks/use-toast'

export default function AdminLogin() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async () => {
    try {
      if (!address) {
        throw new Error('Address not found')
      }

      const message = `Sign this message to login as admin\nNonce: ${Date.now()}`
      const signature = await signMessageAsync({ message })

      const response = await adminLoginAction({ address, signature, message })

      if (!response) {
        throw new Error('Authentication failed')
      }

      toast({
        title: 'Login successful',
        variant: 'success',
      })

      router.push('/admin')
    } catch (err) {
      console.error('Error logging in:', err)
      toast({
        title: 'Login failed',
        description: 'Please make sure you are an authorized admin.',
        variant: 'destructive',
      })
    }
  }

  if (!address) {
    return <ConnectWallet />
  }

  return (
    <div className='flex items-center justify-center py-16'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow dark:bg-gray-800'>
        <h2 className='text-center text-3xl font-bold text-gray-900 dark:text-gray-100'>Admin Login</h2>
        <button
          onClick={handleLogin}
          className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
        >
          Sign In with Wallet
        </button>
      </div>
    </div>
  )
}
