'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Media } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import LogoSkeleton from '@/components/skeletons/LogoSkeleton'
import KeyDownIcon from '@/components/svg/KeyDownIcon'
import SignInImage from '@/public/assets/sign-in.jpeg'
import { trpc } from '@/trpc/client'
import { SignInSchema } from '@/trpc/routers/auth/validator'

const SignInForm: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { data: siteSettingsData } =
    trpc.siteSettings.getSiteSettings.useQuery()
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form

  const { mutate: signInMutation, isPending: isSignInPending } =
    trpc.auth.signIn.useMutation({
      onSuccess: result => {
        const isAdmin = result?.user?.role?.includes('admin')
        if (isAdmin) {
          router.push('/admin')
        } else {
          router.push('/profile')
        }
      },
      onError: error => {
        reset()
        toast.error(error?.message)
      },
    })

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    signInMutation({
      ...data,
    })
  }

  return (
    <div className='fixed flex h-full w-full bg-white'>
      <div className='mx-auto flex h-full max-w-lg flex-col justify-between gap-10 px-6 sm:px-4 lg:w-96 lg:max-w-none lg:gap-0 lg:px-0'>
        <div className='mt-6'>
          <button
            onClick={() => router.push('/')}
            className='h-fit rounded-full bg-secondary py-[6px] pl-2 pr-3 text-[14px]'>
            <KeyDownIcon className='mb-1 mr-1 h-[18px] w-[18px] rotate-90' />
            Back to home
          </button>
        </div>
        <div>
          {/* <Logo className={'flex h-[20px] w-fit items-center justify-start'} /> */}
          <div className='relative h-5 w-20'>
            {!imageLoaded && <LogoSkeleton />}
            {(siteSettingsData?.navbar?.logo?.imageUrl as Media)?.url && (
              <Image
                src={(siteSettingsData?.navbar?.logo?.imageUrl as Media)?.url!}
                alt='Logo'
                fill
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </div>
          <div className='mt-16 font-semibold uppercase tracking-widest text-secondary-content text-opacity-85'>
            Signin
          </div>
          <div className='mt-4 text-[1.5rem] font-semibold leading-8 text-base-content'>
            {siteSettingsData?.general?.description}
          </div>
          <form className='xs:mt-8 mt-6 pr-1' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3.5'>
              <input
                type='email'
                placeholder='Email address'
                {...register('email')}
                className='text-one placeholder:text-four text-md focus: block w-full rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'
              />
              <input
                type='password'
                {...register('password')}
                placeholder='password'
                className='text-one placeholder:text-four text-md focus: block w-full rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'
              />
              <button
                type='submit'
                disabled={isSignInPending}
                className={`h-10 max-h-10 min-h-[40px] w-full rounded-md bg-primary text-[14px] font-medium text-white hover:bg-[#805AE9] ${isSignInPending && 'cursor-not-allowed '}`}>
                {isSignInPending ? (
                  <span>✦ &nbsp;Signing in...</span>
                ) : (
                  <span>✦ &nbsp;Sign in</span>
                )}
              </button>
            </div>
            <div className='mt-2 text-secondary-content'>
              Forgot your password?{' '}
              <Link
                href={'/forgot-password'}
                className='underline hover:text-primary'>
                Reset it.
              </Link>
            </div>
          </form>
          <div className='relative py-6'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-zinc-200'></span>
            </div>
            <div className='relative flex justify-center'>
              <span className='bg-white px-2.5 text-[13px] text-secondary-content text-opacity-85'>
                dont have an account yet?
              </span>
            </div>
          </div>
          <button
            type='button'
            onClick={() => router.push('/sign-up')}
            className='h-10 w-full rounded-md border-[1px] border-[#E5E7EB] bg-secondary text-[0.875rem]'>
            ✦ &nbsp;Sign up
          </button>
        </div>
        <div className='pb-4 text-center text-sm'>
          {siteSettingsData?.footer?.copyright}
        </div>
      </div>
      <div className='m-0 hidden h-full w-2/5 select-none items-center justify-center overflow-hidden bg-zinc-100 p-0  dark:bg-zinc-800 lg:flex'>
        <Image
          src={SignInImage}
          className='h-full w-full object-cover'
          alt='sign-in'
        />
      </div>
    </div>
  )
}

export default SignInForm
