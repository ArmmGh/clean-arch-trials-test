import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function SmallAvatar({ avatarUrl, name }: { avatarUrl: string; name?: string }) {
  return (
    <Avatar className='relative h-10 w-10'>
      <AvatarImage src={avatarUrl} alt={name} />

      <AvatarFallback>
        {name
          ?.split(' ')
          .map((word) => word[0].toUpperCase())
          .join('')}
      </AvatarFallback>
    </Avatar>
  )
}
