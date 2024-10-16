import { createHelia } from 'helia'
import { create as ipfsCore } from '@helia/ipfs-core'
import { strings } from '@helia/strings'

let helia, encoder

// Initialize Helia instance
export const initHelia = async () => {
  if (!helia) {
    // Connect to your local IPFS node
    const ipfsClient = ipfsCore({ url: 'http://localhost:5001' })

    // Create Helia instance
    helia = await createHelia({ ipfs: ipfsClient })
    encoder = strings(helia)
  }
  return { helia, encoder }
}

// Function to add a file to IPFS
export const addFileToIPFS = async (content) => {
  await initHelia()
  const cid = await encoder.add(content)
  return cid.toString()
}

// Function to retrieve a file from IPFS
export const getFileFromIPFS = async (cid) => {
  await initHelia()
  const data = await encoder.cat(cid)
  return new TextDecoder().decode(data) // Assuming content is text-based
}
