import { getAddress } from 'viem'

export const getPublisherAddressFromSession = (cookies: any) => {
  const wagmiStore = cookies.get('wagmi.store')

  if (!wagmiStore) {
    // Return early if the cookie is not present
    return
  }

  let parsedWagmiStore
  try {
    parsedWagmiStore = JSON.parse(wagmiStore.value)
  } catch (error) {
    console.error('Failed to parse wagmi.store cookie:', error)
    return
  }

  // Safely access the state object
  const currentConnectionId = parsedWagmiStore?.state?.current
  const connections = parsedWagmiStore?.state?.connections?.value

  if (!connections || !currentConnectionId) {
    // Return early if state properties are undefined or invalid
    return
  }

  const currentConnection = connections.find(([id]: [id: number]) => id === currentConnectionId)

  if (!currentConnection) {
    return
  }

  const [, connectionData] = currentConnection
  return connectionData?.accounts[0] ? getAddress(connectionData?.accounts[0]) : undefined
}
