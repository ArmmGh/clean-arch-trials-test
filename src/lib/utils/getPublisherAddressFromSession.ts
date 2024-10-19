import { cookies } from 'next/headers'

export const getPublisherAddressFromSession = () => {
  const wagmiStore = cookies().get('wagmi.store')
  const parsedWagmiStore = wagmiStore && JSON.parse(wagmiStore.value)
  const currentConnectionId = parsedWagmiStore.state.current
  const connections = parsedWagmiStore.state.connections.value
  const currentConnection = connections.find(([id]: [id: number]) => id === currentConnectionId)
  const [, connectionData] = currentConnection
  return connectionData?.accounts[0]
}
