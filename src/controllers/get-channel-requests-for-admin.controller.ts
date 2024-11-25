import { withAdminAuth } from '@/actions/utils/with-admin-auth.util'
import { InputParseError } from '@/entities/errors/common'
import { ChannelRequest } from '@/entities/types/channels/channel-request.type'
import getChannelRequestsForAdminUseCase from '@/use-cases/admin/get-channel-requests-for-admin.use-case'
import { format } from 'date-fns'

function presenter(channelRequests: ChannelRequest[]) {
  return channelRequests.map((request) => ({
    channelAddress: request.channel_address,
    channelOwner: request.channel_owner,
    createdAt: format(request.created_at, 'yyyy-MM-dd HH:mm:ss'),
    status: request.status,
  }))
}

export type PresenterType = ReturnType<typeof presenter>[0]

export default async function getChannelRequestsForAdminController(): Promise<ReturnType<typeof presenter>> {
  return withAdminAuth(async () => {
    try {
      const channelRequests = await getChannelRequestsForAdminUseCase()

      return presenter(channelRequests)
    } catch (error) {
      if (error instanceof InputParseError) {
        console.error('Error in getChannelRequestsForAdminController:', error.message)
      } else {
        console.error('Error in getChannelRequestsForAdminController:', error)
      }

      return []
    }
  })
}
