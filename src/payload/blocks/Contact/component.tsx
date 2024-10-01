'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ContactType, Media } from '@payload-types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import LogoSkeleton from '@/components/skeletons/LogoSkeleton'
import KeyDownIcon from '@/svg/KeyDownIcon'
import { trpc } from '@/trpc/client'

import {
  ContactFormValidator,
  TContactForm,
} from './validators/contactValidator'

const Contact: React.FC<ContactType> = ({ ...block }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const router = useRouter()
  const { data } = trpc.siteSettings.getSiteSettings.useQuery()

  const {
    control,
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<TContactForm>({
    resolver: zodResolver(ContactFormValidator),
  })

  const { mutate: contactFormData } =
    trpc.contact.ContactFormPostData.useMutation({
      onSuccess: () => {
        reset()
        toast.success('Contact form is submitted!!', {
          position: 'bottom-right',
        })
      },
      onError: err => {
        toast.error('Failed to submit contact form, Please try again.', {
          position: 'bottom-right',
        })
      },
    })

  const onSubmit = (data: TContactForm) => {
    contactFormData(data)
  }

  return (
    <div className='fixed flex h-full w-full bg-white'>
      <div className='mx-auto flex h-full max-w-lg flex-col justify-between gap-10 px-6 sm:px-4 lg:w-96 lg:max-w-none lg:gap-0 lg:px-0'>
        <div className='mt-6'>
          <button
            onClick={() => router.push('/')}
            className='rounded-full bg-secondary py-[6px] pl-2 pr-3 text-[14px]'>
            <KeyDownIcon className='mb-1 mr-1 h-[18px] w-[18px] rotate-90' />
            Back to home
          </button>
        </div>
        <div>
          <div className='relative h-5 w-24'>
            {!imageLoaded && <LogoSkeleton />}
            {(data?.navbar?.logo?.imageUrl as Media)?.url && (
              <Image
                onLoad={() => setImageLoaded(true)}
                alt=''
                src={(data?.navbar?.logo?.imageUrl as Media)?.url!}
                fill
              />
            )}
          </div>
          <div className='mt-16 font-semibold uppercase tracking-widest text-secondary-content text-opacity-85'>
            {block?.title}
          </div>
          <div className='mt-4 text-[1.5rem] font-semibold leading-8 text-base-content'>
            {block?.description}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='xs:mt-8 mt-6 pr-1'>
            <div className='flex flex-col gap-3.5'>
              <input
                type='text'
                placeholder='Your name'
                {...register('name')}
                className='text-md focus: block w-full rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'
              />
              {errors.name && (
                <p className='text-red-600'>{errors.name.message}</p>
              )}

              <input
                type='email'
                placeholder='Email address'
                {...register('email')}
                className='text-md focus: block w-full rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'
              />
              {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              )}

              <textarea
                cols={30}
                rows={3}
                placeholder='Your message'
                {...register('message')}
                className='text-md focus: block max-h-48 min-h-[100px] w-full resize-y rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'></textarea>
              {errors.message && (
                <p className='text-red-600'>{errors.message.message}</p>
              )}

              <button
                type='submit'
                className='h-10 max-h-10 min-h-[40px] w-full rounded-md bg-primary text-[14px] font-medium text-white'>
                ✦ &nbsp;Send Message
              </button>
            </div>
          </form>
        </div>
        <div className='pb-4 text-center text-sm'>
          {data?.footer?.copyright}
        </div>
      </div>
      <div className='relative m-0 hidden h-full w-2/5 select-none items-center justify-center overflow-hidden bg-zinc-100 p-0  dark:bg-zinc-800 lg:flex'>
        <Image
          src={(block?.image as Media)?.url!}
          className='h-full w-full object-cover'
          alt='Contact Image'
          fill
        />
      </div>
    </div>
  )
}

export default Contact
