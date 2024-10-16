'use server'

import { InputParseError } from '@/entities/errors/common'
// import { extractImagesFromTiptapContent } from '@/services/articles-content-processor.service'
// import { uploadToHelia } from '@/services/helia.service'
import type { Content } from '@tiptap/core'

export default async function createArticleAction(input: { content: Content }) {
  try {
    let updatedContent = input.content as string

    //   const extractedImages = extractImagesFromTiptapContent(input.content as string)
    //   const uploadPromises = []
    //   for (const img of extractedImages) {
    //     if (img.src.startsWith('data:image')) {
    //       uploadPromises.push(uploadBase64ToHelia(img.src))
    //     }
    //   }

    //   const cids = await Promise.all(uploadPromises)

    //   for (let i = 0; i < extractedImages.length; i++) {
    //     updatedContent = updatedContent.replace(extractedImages[i].src, `ipfs://${cids[i]}`)
    //   }

    //   console.log(updatedContent)

    //   // console.log(images)
    //   // await createArticleController(input)
  } catch (error) {
    if (error instanceof InputParseError) {
      return { success: false, error: error.message }
    }

    return { success: false, error: 'An error occurred while creating an article' }
  }

  return { success: true, error: null }
  // redirect('/dashboard')
  // revalidatePath('/') TODO: do we need to revalidate?
}
