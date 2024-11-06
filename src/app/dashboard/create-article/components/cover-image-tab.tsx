'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Upload, RefreshCw, Loader2 } from 'lucide-react'
import Image from 'next/image'
import uploadArticleImageToIPFSAction from '@/app/actions/upload-article-image-to-ipfs.action'
import { useToast } from '@/hooks/use-toast'
import { useFormContext } from 'react-hook-form'
import { gatewayedIpfsUrl, GATEWAYS } from '@/lib/utils'
import { ArticleFormData } from './article-creation-stepper'
import html2canvas from 'html2canvas'
import ArticleEditor from '@/components/articles/article-editor'

const ArticleRenderer = ({ content }: { content: string }) => {
  return (
    <div
      id='article-capture-container'
      className='fixed left-[-9999px] top-[-9999px] z-[9999] m-auto flex h-[720px] w-[1280px] items-start justify-center overflow-hidden bg-transparent p-2'
    >
      <div className='bg-red h-full w-full overflow-hidden rounded-lg border-2 border-input p-5'>
        <ArticleEditor value={content} editable={false} autofocus={false} className={'border-none p-0'} />
      </div>
    </div>
  )
}

export default function CoverImageTab() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showRenderer, setShowRenderer] = useState(true)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { setValue, watch, trigger } = useFormContext<ArticleFormData>()

  // Watch the entire metadata array to ensure reactivity
  const metadata = watch('metadata')
  const content = watch('content')
  const imageFieldIndex = metadata.findIndex((item) => item.key === 'image')

  const finalizeImage = async (img: File) => {
    try {
      const formData = new FormData()
      formData.append('file', img)

      const { error, cid } = await uploadArticleImageToIPFSAction(formData)

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error uploading image',
        })
        return
      }

      if (imageFieldIndex === -1) {
        // If image field doesn't exist, add it
        setValue('metadata', [...metadata, { key: 'image', value: `ipfs://${cid}` }])
      } else {
        // Update existing image field
        const newMetadata = [...metadata]
        newMetadata[imageFieldIndex] = { key: 'image', value: `ipfs://${cid}` }
        setValue('metadata', newMetadata)
      }

      // Trigger form validation
      await trigger()
    } catch (error) {
      console.error('Error in finalizeImage:', error)
      toast({
        variant: 'destructive',
        title: 'Failed to upload image',
      })
    }
  }

  const handleCustomImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      await finalizeImage(file)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const captureImageFromDiv = async () => {
    setIsGenerating(true)
    setShowRenderer(true)

    try {
      // Wait for the next render cycle to ensure the container is mounted
      await new Promise((resolve) => setTimeout(resolve, 100))

      const container = document.getElementById('article-capture-container')
      if (!container) {
        throw new Error('Capture container not found')
      }

      const canvas = await html2canvas(container, {
        width: 1280,
        height: 720,
        // scale: 1,
        backgroundColor: 'white',
        logging: true, // Enable logging for debugging
        useCORS: true,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.getElementById('article-capture-container')
          if (clonedContainer) {
            clonedContainer.style.position = 'relative'
            clonedContainer.style.top = '0'
            clonedContainer.style.left = '0'
          }
        },
      })

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const file = new File([blob], 'cover-image.png', { type: 'image/png' })
            await finalizeImage(file)
          }
        },
        'image/png',
        1,
      )
    } catch (error) {
      console.error('Error capturing image:', error)
      toast({
        variant: 'destructive',
        title: 'Failed to capture image',
      })
    } finally {
      setIsGenerating(false)
      setShowRenderer(false)
    }
  }

  const generateCoverImage = async () => {
    await captureImageFromDiv()
  }

  // Get current image URL
  const currentImageUrl = metadata[imageFieldIndex]?.value
    ? gatewayedIpfsUrl(metadata[imageFieldIndex].value, GATEWAYS.LOCAL)
    : `${process.env.NEXT_PUBLIC_IPFS_PUBLIC_GATEWAY}${process.env.NEXT_PUBLIC_DEFAULT_METADATA_IMAGE}`

  return (
    <>
      {showRenderer && <ArticleRenderer content={content} />}

      <Card className='mx-auto w-full max-w-4xl'>
        <CardContent className='p-6'>
          <div className='space-y-6'>
            <div className='relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-muted'>
              <Image
                unoptimized
                src={currentImageUrl}
                alt='Article cover'
                fill
                className='object-cover'
                // Add key to force re-render when URL changes
                key={currentImageUrl}
              />
            </div>

            <div className='flex flex-col gap-4 sm:flex-row'>
              <Button type='button' onClick={generateCoverImage} className='flex-1'>
                <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating && 'animate-spin'}`} />
                Generate Cover Image
              </Button>

              <div className='flex-1'>
                <Button onClick={handleClick} type='button' variant='outline' className='w-full' disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className='mr-2 h-4 w-4' />
                      Upload Custom Image
                    </>
                  )}
                </Button>
                <Input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleCustomImageUpload}
                />
              </div>
            </div>

            <p className='text-center text-sm text-muted-foreground'>
              Generate a cover image for your article or upload a custom image
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
