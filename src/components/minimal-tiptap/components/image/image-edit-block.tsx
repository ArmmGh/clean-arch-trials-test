import * as React from 'react'
import type { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { readFileAsDataURL } from '../../utils'
import { create } from 'ipfs-http-client'
import uploadToIPFSAction from '@/app/actions/uploadToIPFS.action'

interface ImageEditBlockProps {
  editor: Editor
  close: () => void
}

const uploadToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await uploadToIPFSAction(formData)

  if (!response) {
    throw new Error('Failed to upload file to IPFS')
  }

  // const data = await response.json()
  return response.url!
}

// try {
//   const ipfs = create({ url: 'http://localhost:5001/api/v0' }) // You may need to replace this with your IPFS node address
//   const added = await ipfs.add(file)
//   return `https://ipfs.io/ipfs/${added.path}`
// } catch (error) {
//   console.error('Error uploading file to IPFS:', error)
//   throw error
// }

export const ImageEditBlock: React.FC<ImageEditBlockProps> = ({ editor, close }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [link, setLink] = React.useState('')

  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleLink = React.useCallback(() => {
    if (link) {
      editor.chain().focus().setImage({ src: link }).run()
      close()
    }
  }, [editor, link, close])

  const handleFile = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files?.length) return

      const insertImages = async () => {
        for (const file of Array.from(files)) {
          try {
            const ipfsUrl = await uploadToIPFS(file)

            // const dataUrl = await readFileAsDataURL(file)
            editor
              .chain()
              .focus()
              .insertContent([{ type: 'image', attrs: { src: ipfsUrl /* dataUrl */ } }, { type: 'paragraph' }])
              .run()
          } catch (error) {
            console.error('Failed to read file:', error)
          }
        }
      }

      await insertImages()
      close()
    },
    [editor, close],
  )

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleLink()
    },
    [handleLink],
  )

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-1'>
        <Label htmlFor='image-link'>Attach an image link</Label>
        <div className='flex'>
          <Input
            id='image-link'
            type='url'
            required
            placeholder='https://example.com'
            value={link}
            className='grow'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
          />
          <Button type='submit' className='ml-2'>
            Submit
          </Button>
        </div>
      </div>
      <Button type='button' className='w-full' onClick={handleClick}>
        Upload from your computer
      </Button>
      <input type='file' accept='image/*' ref={fileInputRef} multiple className='hidden' onChange={handleFile} />
    </form>
  )
}

export default ImageEditBlock
