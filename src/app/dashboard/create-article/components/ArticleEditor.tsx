'use client'

import type { Content } from '@tiptap/core'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import createArticleAction from '@/app/actions/createArticle.action'
import { useToast } from '@/hooks/use-toast'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'

export default function ArticleEditor() {
  const [value, setValue] = useState<Content>('')
  const { toast } = useToast()

  const submitArticle = async () => {
    const result = await createArticleAction({ content: value as string })

    if (result.success) {
      toast({
        title: 'Article Drafted',
        description: 'Your article has been successfully Drafted',
      })
    }
  }

  return (
    <div>
      <MinimalTiptapEditor
        value={value}
        onChange={setValue}
        className='w-full'
        editorContentClassName='p-5'
        output='html'
        placeholder='Type your description here...'
        autofocus={true}
        editable={true}
        editorClassName='focus:outline-none'
        immediatelyRender={false}
      />

      <Button onClick={submitArticle}>Submit</Button>
    </div>
  )
}
