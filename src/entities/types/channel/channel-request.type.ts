import { Database } from '@/database.types'

export type ChannelRequest = {
  channel_address: string
  channel_owner: string
  created_at: string
  status: Database['public']['Enums']['channel_request_status']
}
