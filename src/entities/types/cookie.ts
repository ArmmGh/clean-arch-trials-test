export type Connector = {
  id: string
  name: string
  type: string
  uid: string
}

export type Connection = [
  string,
  {
    accounts: string[]
    chainId: number
    connector: Connector
  },
]

export type WagmiStore = {
  state: {
    connections: {
      __type: 'Map'
      value: Connection[]
    }
    chainId: number
    current: string
  }
  version: number
}
