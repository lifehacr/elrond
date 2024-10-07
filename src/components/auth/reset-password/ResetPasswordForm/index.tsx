'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Media } from '@payload-types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import LogoSkeleton from '@/components/skeletons/LogoSkeleton'
import KeyDownIcon from '@/components/svg/KeyDownIcon'
import { trpc } from '@/trpc/client'
import { ResetPasswordSchema } from '@/trpc/routers/auth/validator'

interface Props {
  token: string
}

const ResetPasswordForm: React.FC<Props> = ({ token }) => {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)
  const { data: siteSettingsData } =
    trpc.siteSettings.getSiteSettings.useQuery()
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onBlur',
    defaultValues: { token, password: '' },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const {
    mutate: resetPasswordMutation,
    isPending: isResetPasswordPending,
    isError: isResetPasswordError,
    error: resetPasswordError,
    isSuccess: isResetPasswordSuccess,
  } = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      toast.success('Changed your password!')
      router.push('/sign-in')
    },
    onError: () => {
      toast.error('Not able to change your password, try again!')
    },
  })

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    resetPasswordMutation({
      ...data,
    })
  }

  return (
    <div className='fixed flex h-full w-full bg-white'>
      <div className='mx-auto flex h-full max-w-lg flex-col justify-center gap-10 px-6 sm:px-4 lg:w-96 lg:max-w-none lg:gap-0 lg:px-0'>
        <div>
          <button
            onClick={() => router.push('/sign-in')}
            className='h-fit rounded-full bg-secondary py-[6px] pl-2 pr-3 text-[14px]'>
            <KeyDownIcon className='mb-1 mr-1 h-[18px] w-[18px] rotate-90' />
            sign in
          </button>
          <div className='relative mt-6 h-5 w-20'>
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
            Reset Password
          </div>
          <form className='xs:mt-8 mt-6 pr-1' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3.5'>
              <input
                type='password'
                placeholder='Enter new password'
                {...register('password')}
                className='text-one placeholder:text-four text-md focus: block w-full rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'
              />
              <button
                type='submit'
                disabled={isResetPasswordPending}
                className={`h-10 max-h-10 min-h-[40px] w-full rounded-md bg-primary text-[14px] font-medium text-white hover:bg-[#805AE9] ${isResetPasswordPending && 'cursor-not-allowed '}`}>
                {isResetPasswordPending ? (
                  <span>✦ &nbsp;Resetting...</span>
                ) : (
                  <span>✦ &nbsp;Confirm Password</span>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className='pb-4 text-center text-sm'>
          {siteSettingsData?.footer?.copyright}
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm
