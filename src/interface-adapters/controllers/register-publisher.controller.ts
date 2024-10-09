import { registerPublisherUseCase } from '@/application/use-cases/register-publisher.use-case'
import { InputParseError } from '@/entities/errors/common'
import { Publisher } from '@/entities/models/publisher'
import { Hash } from 'viem'
import { z } from 'zod'

function presenter(publisher: Publisher) {
  return {
    id: publisher.id,
    username: publisher.username,
    address: publisher.address,
  }
}

const inputSchema = z.object({ tx: z.string(), username: z.string().min(3).max(31), address: z.string() })

export async function registerPublisherController(
  input: Partial<z.infer<typeof inputSchema>>,
): Promise<ReturnType<typeof presenter>> {
  // Verify input
  const { data, error: inputParseError } = inputSchema.safeParse(input)

  if (inputParseError) {
    throw new InputParseError('Invalid data', { cause: inputParseError })
  }
  // Call use-case
  const publisher = await registerPublisherUseCase(data)

  // Format output
  // Return output
  return presenter(publisher)
}
