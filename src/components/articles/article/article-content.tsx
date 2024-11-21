import { CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function ArticleContent({
  image,
  name,
  description,
  children,
}: {
  image: string
  name: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <CardContent className='p-0'>
      <div className='relative mb-4 aspect-[2/1] overflow-hidden rounded-[15px] lg:aspect-[2/1]'>
        <Image src={image} alt={name} fill className='object-cover' />
      </div>
      <h2 className='mb-2 text-xl font-bold'>{name}</h2>
      <p className='text-muted-foreground'>{description}</p>

      {children}
    </CardContent>
  )
}
