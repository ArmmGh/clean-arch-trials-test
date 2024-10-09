import type { Publisher } from '@/entities/models/publisher'
import { Address, Hash } from 'viem'

export function registerPublisherUseCase(input: { address: string; username: string; tx: string }): Promise<Publisher> {
  // TODO: Implement use-case
  // Check Authorization if needed
  // Check if user is already registered
  // Add data to Elasticsearch index
  // Add data to IFPS
  // Return Publisher
}
