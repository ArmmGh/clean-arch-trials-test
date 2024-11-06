export const mainTowerAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "channelAddress_",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "articleID_",
        "type": "uint256"
      }
    ],
    "name": "ArticleAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "publisherAddress_",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "channelAddress_",
        "type": "address"
      }
    ],
    "name": "PublisherRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "channelAddress_",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "articleID_",
        "type": "uint256"
      }
    ],
    "name": "newAarticleAnnouncement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "publisherAddress_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "channelAddress_",
        "type": "address"
      }
    ],
    "name": "newPublisherAnnouncement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
