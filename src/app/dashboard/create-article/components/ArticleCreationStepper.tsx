'use client'

import saveArticleAction from '@/app/actions/saveArticle.action'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useReadMetadataAttributesGetDefaultMetadataAsArray, useWriteChannelMint } from '@/generated'
import { useToast } from '@/hooks/use-toast'
import { config } from '@/lib/config/wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import ArticleEditor from './ArticleEditor'

export type MetadataItem = { key: string; value: string; isDefault: boolean }

type FormData = {
  content: string
  metadata: MetadataItem[]
}

function ContentTab() {
  const { control } = useFormContext<FormData>()
  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='content'>Content</Label>
        <Controller
          name='content'
          control={control}
          render={({ field }) => <ArticleEditor id='content' value={field.value} onValueChange={field.onChange} />}
        />
      </div>
    </div>
  )
}

function MetadataTab() {
  const { control } = useFormContext<FormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata',
  })

  return (
    <div className='space-y-4'>
      {fields.map((field, index) => (
        <div key={field.id} className='flex space-x-2'>
          <Controller
            name={`metadata.${index}.key`}
            control={control}
            render={({ field: keyField }) => <Input {...keyField} placeholder='Key' disabled={field.isDefault} />}
          />
          <Controller
            name={`metadata.${index}.value`}
            control={control}
            render={({ field: valueField }) => <Input {...valueField} placeholder='Value' />}
          />
          {!field.isDefault && (
            <Button type='button' variant='destructive' onClick={() => remove(index)}>
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button type='button' onClick={() => append({ key: '', value: '', isDefault: false })}>
        Add New Metadata Field
      </Button>
    </div>
  )
}

function PreviewTab() {
  const { watch } = useFormContext<FormData>()
  const content = watch('content')
  const metadata = watch('metadata')

  return (
    <div className='space-y-4'>
      <h3>Content Preview:</h3>
      <p>{content}</p>
      <h3>Metadata Preview:</h3>
      <ul>
        {metadata.map((item, index) => (
          <li key={index}>
            {item.key}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ArticleCreationStepper({
  setTab,
  activeChannelAddress,
}: {
  setTab: (tab: 'create' | 'drafts') => void
  activeChannelAddress?: Address
}) {
  const [activeStep, setActiveStep] = useState('content')
  const { toast } = useToast()
  const { address: publisherAddress } = useAccount()
  const [isSaving, setIsSaving] = useState(false)
  const { writeContractAsync } = useWriteChannelMint()
  const router = useRouter()

  const { data: defaultMetadata } = useReadMetadataAttributesGetDefaultMetadataAsArray({
    query: {
      select: (data) => {
        if (data && data.length === 2) {
          const [keys, values] = data
          return keys.reduce((acc, key, index) => {
            if (key && values[index]) {
              acc.push({ key, value: values[index], isDefault: true })
            }
            return acc
          }, [] as MetadataItem[])
        }
        return []
      },
    },
  })

  const methods = useForm<FormData>({
    defaultValues: {
      content: '',
      metadata: [],
    },
  })

  const { handleSubmit, watch, setValue } = methods

  useEffect(() => {
    if (defaultMetadata && defaultMetadata.length > 0) {
      setValue('metadata', defaultMetadata)
    }
  }, [defaultMetadata, setValue])

  const content = watch('content')
  const metadata = watch('metadata')

  const isPreviewDisabled = !content || metadata.length === 0 || metadata.some((item) => !item.key || !item.value)

  const onSubmit = async (data: FormData) => {
    if (!activeChannelAddress || !publisherAddress) {
      toast({
        variant: 'destructive',
        title: 'Choose a Channel',
      })

      return
    }
    setIsSaving(true)
    // 0. (Save) button clicked
    // 1. Change Article content images to IPFS public gatewayed links
    // 2. Save that Article as HTML on IPFS and put CID as htmlCid in the metadata field
    // 3. Save Article as Draft in MongoDB and return
    // 4. If is drafted successfully show (Mint) button or ask to MINT
    // 5. Maybe allow only one draft for now

    // const isDrafted = await checkIsDraftedAction()
    // draftArticleAction

    // const isDrafted = await draftArticleUseCase(channelAddress, articleContent)

    const { article, error } = await saveArticleAction({ channelAddress: activeChannelAddress, article: data })

    setIsSaving(false)

    if (article) {
      toast({
        title: 'Article Drafted!',
        description: 'Your article has been successfully drafted!',
      })

      const hash = await writeContractAsync({
        address: activeChannelAddress,
        args: [publisherAddress, article.metadata],
      })

      const { status } = await waitForTransactionReceipt(config, { hash })

      if (status === 'success') {
        toast({
          title: 'Article Minted!',
          description: 'Your article has been successfully minted!',
        })

        router.push('/dashboard')
      } else {
        toast({
          title: 'Article Minting Failed!',
          description: 'Your article could not be minted!',
        })

        setTab('drafts')
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Article Draft Failed!',
        description: error,
      })
    }

    // console.log('Minting article with data:', data)
    // Handle minting process here
  }

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>, nextStep: string) => {
    e.preventDefault() // Prevent form submission
    setActiveStep(nextStep)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='mx-auto w-full rounded-t-none border-2 border-t-0 border-muted'>
          <CardHeader>
            <CardTitle>Create Article</CardTitle>
            <CardDescription>Fill in the details to create a new article</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeStep} onValueChange={setActiveStep} className='w-full'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='content'>Content</TabsTrigger>
                <TabsTrigger value='metadata'>Metadata</TabsTrigger>
                <TabsTrigger value='preview' disabled={isPreviewDisabled}>
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value='content'>
                <ContentTab />
              </TabsContent>
              <TabsContent value='metadata'>
                <MetadataTab />
              </TabsContent>
              <TabsContent value='preview'>
                <PreviewTab />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button
              type='button'
              variant='outline'
              onClick={(e) => handleNavigation(e, activeStep === 'metadata' ? 'content' : 'metadata')}
              disabled={activeStep === 'content'}
            >
              Previous
            </Button>
            {activeStep === 'preview' ? (
              <Button type='submit' disabled={isSaving}>
                {isSaving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Save Article
              </Button>
            ) : (
              <Button
                type='button'
                onClick={(e) => handleNavigation(e, activeStep === 'content' ? 'metadata' : 'preview')}
                disabled={isPreviewDisabled}
              >
                Next
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}
