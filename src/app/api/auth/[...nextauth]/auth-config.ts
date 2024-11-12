import { DefaultSession, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { type SIWESession, verifySignature, getChainIdFromMessage, getAddressFromMessage } from '@reown/appkit-siwe'
import { Address } from 'viem'

// Extend next-auth types
declare module 'next-auth' {
  interface Session extends DefaultSession, SIWESession {
    address: Address
    chainId: number
  }
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not set')
}

if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_WC_PROJECT_ID is not set')
}

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.message) {
            throw new Error('SiweMessage is undefined')
          }
          const { message, signature } = credentials
          const address = getAddressFromMessage(message)
          const chainId = getChainIdFromMessage(message)

          const isValid = await verifySignature({
            address,
            message,
            signature,
            chainId,
            projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
          })

          if (isValid) {
            return {
              id: `${chainId}:${address}`,
            }
          }

          return null
        } catch (e) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (!token.sub) {
        return session
      }

      const [, chainId, address] = token.sub.split(':')
      if (chainId && address) {
        session.address = address as Address
        session.chainId = parseInt(chainId, 10)
      }

      return session
    },
  },
}
