import { Database } from '@/database.types'

export type Admin = {
  address: string
  environment: Database['public']['Enums']['env_type']
  id: string
  last_login: string | null
  session_expiry: string | null
  session_token: string | null
}
