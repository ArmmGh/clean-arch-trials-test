export const factoryAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "metadataAttributes_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "channelLedger_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ledger",
    "outputs": [
      {
        "internalType": "contract IChannelLedger",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "metadataAttributes",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "channelName_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "channelDescription_",
        "type": "string"
      }
    ],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "channelName_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "channelDescription_",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "tower_",
        "type": "address"
      }
    ],
    "name": "registerAndAnnounce",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
