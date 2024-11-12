'use server'

import { ArticleFormData } from '@/app/dashboard/create-article/components/article-creation-stepper'
import { InputParseError, SupabaseError } from '@/entities/errors/common'
import prepareArticleMetadataController from '@/controllers/articles/prepare-article-metadata.controller'

export default async function prepareArticleMetadataAction(formData: ArticleFormData) {
  try {
    const metadata = await prepareArticleMetadataController(formData)

    return { success: true, metadata }
  } catch (error) {
    if (error instanceof InputParseError || error instanceof SupabaseError) {
      console.error('Error in prepareArticleMetadataAction:', error.cause, error.message)

      return { error: error.message }
    }

    console.log('error', error)
    return { error: 'Something went wrong while saving the article' }
  }
}
