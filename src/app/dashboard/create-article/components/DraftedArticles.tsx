import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import { DraftedArticle } from '@/entities/schemas/draftArticleSchema'

export default function DraftedArticles({ draftedArticles }: { draftedArticles: DraftedArticle[] }) {
  return (
    <div>
      {draftedArticles.map(({ articleContent }, index) => (
        <div key={index} className='rounded-lg border'>
          Draft Article #{index + 1}
          {/* // <div key={index}>{articleContent}</div>
          // <iframe src='' frameborder='0'></iframe> */}
          <MinimalTiptapEditor
            value={articleContent}
            onChange={() => {}}
            className='w-full rounded-lg'
            editorContentClassName='p-5'
            output='html'
            // placeholder='Type your description here...'
            autofocus={false}
            editable={false}
            // editorClassName='focus:outline-none'
            immediatelyRender={false}
          />
        </div>
      ))}
    </div>
  )
}
