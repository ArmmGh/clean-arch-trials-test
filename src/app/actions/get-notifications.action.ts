'use server'

import getNotificationsUseCase from '@/use-cases/get-notifications.use-case'
import { getAddress } from 'viem'

export default async function getNotificationsAction(userAddress: string): Promise<string[]> {
  try {
    const notification = await getNotificationsUseCase(getAddress(userAddress))

    return notification
  } catch (error) {
    console.error(error)

    return []
  }
}
