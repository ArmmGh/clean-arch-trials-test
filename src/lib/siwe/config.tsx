import { getCsrfToken, signIn, signOut, getSession } from 'next-auth/react'
import type { SIWEVerifyMessageArgs, SIWECreateMessageArgs, SIWESession } from '@reown/appkit-siwe'
import { createSIWEConfig, formatMessage } from '@reown/appkit-siwe'
import { defaultChain } from '@/lib/config/chains'

export const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    domain: typeof window !== 'undefined' ? window.location.host : '',
    uri: typeof window !== 'undefined' ? window.location.origin : '',
    chains: [defaultChain.id],
    statement: 'Please sign with your account',
  }),
  createMessage: ({ address, ...args }: SIWECreateMessageArgs) => formatMessage(args, address),
  getNonce: async () => {
    const nonce = await getCsrfToken()
    if (!nonce) {
      throw new Error('Failed to get nonce!')
    }

    return nonce
  },
  getSession: async () => {
    const session = await getSession()
    if (!session) {
      throw new Error('Failed to get session!')
    }

    const { address, chainId } = session as unknown as SIWESession

    return { address, chainId }
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      const success = await signIn('credentials', {
        message,
        redirect: false,
        signature,
        callbackUrl: '/protected',
      })

      return Boolean(success?.ok)
    } catch (error) {
      return false
    }
  },

  signOut: async () => {
    const securePaths = ['/dashboard', '/admin', '/towers', '/saved', '/settings']
    const currentPathname = window.location.pathname

    try {
      const isProtectedRoute = securePaths.includes(currentPathname)
      const callbackUrl = isProtectedRoute ? '/' : undefined
      const redirect = isProtectedRoute ? true : false

      await signOut({
        redirect,
        callbackUrl,
      })

      if (!isProtectedRoute) {
        window.postMessage({ type: 'sign-out' }, window.location.origin)
      }

      return true
    } catch (error) {
      return false
    }
  },
  onSignIn: (session) => {
    window.postMessage({ type: 'sign-in', session }, window.location.origin)
  },
})
