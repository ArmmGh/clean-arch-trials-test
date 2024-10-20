export const getPublisherAddressFromSession = (cookies: any) => {
  const wagmiStore = cookies.get('wagmi.store')

  if (!wagmiStore) {
    // Return early if the cookie is not present
    return null
  }

  let parsedWagmiStore
  try {
    parsedWagmiStore = JSON.parse(wagmiStore.value)
  } catch (error) {
    console.error('Failed to parse wagmi.store cookie:', error)
    return null
  }

  // Safely access the state object
  const currentConnectionId = parsedWagmiStore?.state?.current
  const connections = parsedWagmiStore?.state?.connections?.value

  if (!connections || !currentConnectionId) {
    // Return early if state properties are undefined or invalid
    return null
  }

  const currentConnection = connections.find(([id]: [id: number]) => id === currentConnectionId)

  if (!currentConnection) {
    return null
  }

  const [, connectionData] = currentConnection
  return connectionData?.accounts[0] ?? null
}
