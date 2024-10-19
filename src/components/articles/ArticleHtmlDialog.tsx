import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ArticleEditor from '@/app/dashboard/create-article/components/ArticleEditor'

export default function ArticleHtmlDialog({
  html,
  name,
  description,
  htmlContent,
}: {
  html: string
  name: string
  description: string
  htmlContent?: string
}) {
  return (
    <Dialog>
      <DialogTrigger className='w-full' asChild>
        <Button className='w-full rounded-md'>View Article</Button>
      </DialogTrigger>
      <DialogContent className='max-w-screen flex h-screen max-w-screen-md flex-col'>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {htmlContent ? (
          <ArticleEditor
            containerClassName={'overflow-hidden'}
            className={'overflow-y-scroll'}
            editable={false}
            autofocus={false}
            value={htmlContent}
          />
        ) : (
          <iframe src={html} className='h-full w-full max-w-full' />
        )}
      </DialogContent>
    </Dialog>
  )
}
