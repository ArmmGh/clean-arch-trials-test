import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export default function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithAuth: React.FC<P> = (props) => {
    const { isConnected } = useAccount()
    const router = useRouter()

    useEffect(() => {
      if (!isConnected) {
        router.push('/')
      }
    }, [isConnected, router])

    if (!isConnected) {
      return null // or a loading spinner
    }

    return <WrappedComponent {...props} />
  }

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return WithAuth
}
