'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { toast } from 'sonner'

import KeyDownIcon from '@/components/svg/KeyDownIcon'
import Logo from '@/components/svg/Logo'
import SignInImage from '@/public/assets/sign-in.jpeg'
import { trpc } from '@/trpc/client'

import { SignUpFormData, SignUpFormSchema } from './validator'

const SignUpForm: React.FC = () => {
  const router = useRouter()

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form

  const { mutate: signUpMutation, isPending: isSignUpPending } =
    trpc.auth.signUp.useMutation({
      onSuccess: () => {
        reset()
        toast.success('Successfully created, redirecting...')
        router.push('/')
      },
      onError: () => {
        toast.error('Unable to create an account, try again!')
      },
    })

  const onSubmit = async (data: SignUpFormData) => {
    const randomNum = Math.floor(Math.random() * (24 - 1 + 1)) + 1
    const imageUrl = `/images/avatar/avatar_${randomNum}.jpg`

    signUpMutation({
      ...data,
      imageUrl,
    })
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = slugify(event.target.value, {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
      locale: 'en',
      trim: false,
    })
    setValue('username', value, { shouldValidate: true })
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
          <Logo className={'flex h-[20px] w-fit items-center'} />
          <div className='mt-16 font-semibold uppercase tracking-widest text-secondary-content text-opacity-85'>
            Signup
          </div>
          <div className='mt-4 text-[1.5rem] font-semibold leading-8 text-base-content'>
            A super minimal & lightweight theme with Premium Membership and
            fully Ghost-compatible.
          </div>
          <form className='xs:mt-8 mt-6 pr-1' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3.5'>
              <input
                {...register('username')}
                onChange={handleUsernameChange}
                id='username'
                name='username'
                type='name'
                placeholder='Your name'
                className='text-one placeholder:text-four text-md focus: block w-full rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'
              />
              <input
                {...register('email')}
                id='email'
                name='email'
                type='email'
                placeholder='Email address'
                className='text-one placeholder:text-four text-md focus: block w-full rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'
              />
              <input
                {...register('password')}
                type='password'
                id='password'
                placeholder='password'
                className='text-one placeholder:text-four text-md focus: block w-full rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none'
              />
              <button
                type='submit'
                disabled={isSignUpPending}
                className='h-10 max-h-10 min-h-[40px] w-full rounded-md bg-primary text-[14px] font-medium text-white hover:bg-[#805AE9]'>
                ✦ &nbsp;Sign up
              </button>
            </div>
          </form>
          <div className='relative py-6'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-zinc-200'></span>
            </div>
            <div className='relative flex justify-center'>
              <span className='bg-white px-2.5 text-[13px] text-secondary-content text-opacity-85'>
                Already have an account?
              </span>
            </div>
          </div>
          <button
            type='button'
            onClick={() => router.push('/sign-in')}
            className='h-10 w-full rounded-md border-[1px] bg-secondary text-[0.875rem]'>
            ✦ &nbsp;Sign in
          </button>
        </div>
        <div className='pb-4 text-center text-sm'>
          © 2024 Elrond - Published with Ghost & Elrond
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

export default SignUpForm
