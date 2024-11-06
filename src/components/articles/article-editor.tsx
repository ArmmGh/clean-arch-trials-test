'use client'

import React, { forwardRef } from 'react'
import type { Content } from '@tiptap/core'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import { cn } from '@/lib/utils'

interface ArticleEditorProps {
  value: Content
  onValueChange: (value: Content) => void
  [key: string]: any
}

const ArticleEditor = forwardRef<HTMLDivElement, ArticleEditorProps>(
  ({ containerClassName, value, onValueChange, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2', containerClassName)}>
        <MinimalTiptapEditor
          value={value}
          onChange={onValueChange}
          className='w-full rounded-lg'
          editorContentClassName='p-5'
          output='html'
          placeholder='Type your article here...'
          autofocus={true}
          editable={true}
          editorClassName='focus:outline-none'
          immediatelyRender={false}
          {...props}
        />
      </div>
    )
  },
)

ArticleEditor.displayName = 'ArticleEditor'

export default ArticleEditor
