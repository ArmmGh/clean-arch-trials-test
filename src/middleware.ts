import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { WagmiStore } from './entities/types/cookie'

export function middleware(request: NextRequest) {
  const wagmiStore = request.cookies.get('wagmi.store')

  if (!wagmiStore) {
    console.error('No wagmi store found in cookies')
    return NextResponse.redirect(new URL('/', request.url))
  }

  let parsedWagmiStore: WagmiStore
  try {
    parsedWagmiStore = JSON.parse(wagmiStore.value)
  } catch (error) {
    console.error('Error parsing wagmiStoreValue:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }

  const isConnected = parsedWagmiStore.state.current !== undefined

  if (!isConnected) {
    console.error('User is not connected')
    return NextResponse.redirect(new URL('/', request.url))
  }

  const currentConnectionId = parsedWagmiStore.state.current
  const connections = parsedWagmiStore.state.connections.value
  const currentConnection = connections.find(([id]) => id === currentConnectionId)

  if (!currentConnection) {
    console.error('Current connection not found')
    return NextResponse.redirect(new URL('/', request.url))
  }

  const [, connectionData] = currentConnection
  const chainId = connectionData.chainId

  const stateChainId = parsedWagmiStore.state.chainId
  if (chainId !== stateChainId) {
    console.error('Chain ID mismatch')
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
}
