export const mainTowerAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "towerName_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "towerDescription_",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "minPrice_",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "windowSize_",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceIncrease_",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "announcemenType_",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "arg1_",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "arg2_",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "arg3_",
        "type": "bytes"
      }
    ],
    "name": "Announced",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "announcemenType_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "arg1_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "arg2_",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "arg3_",
        "type": "bytes"
      }
    ],
    "name": "announcement",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "announcementsPerBlock",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "oldestTrackedBlock",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "price",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "priceIncrease",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalAnnouncementsInWindow",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "towerDescription",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "towerName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "windowSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
