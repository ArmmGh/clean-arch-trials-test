import { Badge } from '@/components/ui/badge'

export default function ChannelStatusBadge({ status }: { status: string }) {
  const isPending = status === 'pending'
  const isBlacklisted = status === 'blacklisted'
  const variant = isBlacklisted ? 'destructive' : isPending ? 'default' : 'success'

  return (
    <Badge className='py-1 text-xs' variant={variant}>
      {status}
    </Badge>
  )
}
