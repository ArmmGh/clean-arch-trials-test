import { z } from 'zod'
import { MetadataItem } from '@/app/dashboard/create-article/components/article-creation-stepper'
import { InputParseError } from '@/entities/errors/common'
import prepareArticleMetadataUseCase from '@/use-cases/articles/prepare-article-metadata.use-case'

const inputSchema = z.object({
  content: z.string(),
  metadata: z.array(z.object({ key: z.string(), value: z.string() })),
})

export default async function prepareArticleMetadataController(
  input: z.infer<typeof inputSchema>,
): Promise<MetadataItem[]> {
  const { data, error: inputParseError } = inputSchema.safeParse(input)

  if (inputParseError) {
    throw new InputParseError(inputParseError.message)
  }

  return prepareArticleMetadataUseCase(data.content, data.metadata)
}
