'use server'

import { InputParseError } from '@/entities/errors/common'
import uploadArticleImageToIPFSUseCase from '@/use-cases/upload-article-image-to-ipfs.use-case'
import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 3 // 3MB
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/ogg',
]

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`)
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    `Only the following image types are allowed: ${ACCEPTED_FILE_TYPES.join(', ')}.`,
  )

export default async function uploadArticleImageToIPFSAction(
  formData: FormData,
): Promise<{ success: boolean; url?: string; cid?: string; error?: string }> {
  try {
    const file = formData.get('file')
    const { data, error: inputParseError } = imageSchema.safeParse(file)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message || 'Invalid file', { cause: inputParseError })
    }

    const { url, cid } = await uploadArticleImageToIPFSUseCase(data)

    return { success: true, url, cid }
  } catch (error) {
    if (error instanceof InputParseError) {
      return { success: false, error: error.message }
    }

    console.error('Error uploading file to IPFS:', error)
    return { success: false, error: 'Failed to upload file to IPFS' }
  }
}
