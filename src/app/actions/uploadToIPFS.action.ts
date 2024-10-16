// app/actions/uploadToIpfs.ts
import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { CID } from 'multiformats/cid'

// ---- HELIA -----
let helia: Awaited<ReturnType<typeof createHelia>> | null = null

async function getHelia() {
  if (!helia) {
    helia = await createHelia({
      // Optional: Configure Helia to connect to your local IPFS daemon
      // ipfs: {
      //   host: 'localhost',
      //   port: 5001,
      //   protocol: 'http',
      // },
    })
  }
  return helia
}

async function pinFile(h: Awaited<ReturnType<typeof createHelia>>, cid: CID) {
  // const { pin } = await import('@helia/pin')
  return h.pins.add(cid)
  // const pinningService = pin(h)

  // Pin the file CID
  // await pinningService.pin(cid)
}

export default async function uploadToIPFSAction(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) {
    throw new Error('No file provided')
  }

  try {
    const h = await getHelia()
    const fs = unixfs(h)

    const buffer = await file.arrayBuffer()
    const content = new Uint8Array(buffer)

    // Add the file to IPFS
    const cid = await fs.addFile({ content })

    await pinFile(h, cid)

    // Use a public gateway to make the file accessible
    const url = `https://ipfs.io/ipfs/${cid.toString()}`

    return { success: true, url, cid: cid.toString() }
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    return { success: false, error: 'Failed to upload to IPFS' }
  }
}

// ----- IPFS -----
// import { create } from 'ipfs-http-client'

// const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' }) // Replace with your IPFS node if needed

// export default async function uploadToIPFSAction(formData: FormData) {
//   const file = formData.get('file') as File
//   if (!file) {
//     throw new Error('No file provided')
//   }

//   try {
//     const buffer = await file.arrayBuffer()
//     const added = await ipfs.add(buffer)
//     const url = `https://ipfs.io/ipfs/${added.path}`
//     return { success: true, url }
//   } catch (error) {
//     console.error('Error uploading to IPFS:', error)
//     return { success: false, error: 'Failed to upload to IPFS' }
//   }
// }
