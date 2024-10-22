import { Card, CardDescription, CardHeader } from '@/components/ui/card'

export default function DraftedArticles() {
  return (
    <Card className='mx-auto w-full rounded-t-none border-2 border-t-0 border-muted'>
      <CardHeader>
        <CardDescription className='text-center'>Coming Soon!</CardDescription>
      </CardHeader>
    </Card>
  )
}
