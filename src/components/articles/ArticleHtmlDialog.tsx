import ArticleEditor from '@/components/articles/article-editor'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function ArticleHtmlDialog({
  name,
  description,
  htmlContent,
}: {
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

        <ArticleEditor
          containerClassName={'overflow-hidden'}
          className={'overflow-y-scroll'}
          editable={false}
          autofocus={false}
          value={htmlContent}
        />
      </DialogContent>
    </Dialog>
  )
}
