'use client'

import { useRouter } from 'next/navigation'

import Container from '@/payload/blocks/common/Container'
import { trpc } from '@/trpc/client'

const WelcomePage = () => {
  const router = useRouter()
  const { mutate: runSeedMutation, isPending: isSeedLoading } =
    trpc.seed.runSeed.useMutation({
      onSuccess: () => {
        // ! router.refresh() is not working as expected.
        window.location.reload()
      },
    })

  const handleSeedData = () => {
    console.log('in function')
    runSeedMutation()
  }

  return (
    <div>
      <div>
        <div className='fixed left-1/4 top-1/4 h-80 w-80 rounded-full bg-[#f974161d] blur-3xl'></div>
        <div className='fixed left-1/2 top-1/2 h-64 w-64 rounded-full bg-[#fed9051d] blur-3xl'></div>
      </div>
      <Container className='flex min-h-screen max-w-full flex-col items-center justify-center gap-14 bg-base-100 px-10'>
        <div className='flex flex-col gap-y-3'>
          <div className='mx-auto  w-2/3 bg-gradient-to-r from-[#F97316] to-[#FED705] bg-clip-text text-center text-5xl font-medium text-transparent'>
            <span className='text-xl'>✦</span> All set!{' '}
            <span className='text-xl'>✦</span>
          </div>
          <div className='mx-auto w-2/3 text-center text-xl'>
            Begin personalizing your theme to create a unique and engaging
            experience.
          </div>
        </div>
        <div className='mx-auto flex w-full flex-col items-center justify-center gap-8 md:w-2/3 md:flex-row'>
          <div className='flex h-fit w-full flex-col justify-between rounded-md bg-amber-100 px-8 py-4 md:h-72 md:w-2/3 lg:h-56'>
            <div>
              <strong>Welcome to your new theme!</strong> To get started, head
              to the admin area to begin adding and managing your own content.
            </div>
            <button
              onClick={() => router.push('/admin')}
              disabled={isSeedLoading}
              className='z-50 mt-6 rounded-md bg-primary px-4 py-2 text-center text-white'>
              Go to admin
            </button>
          </div>
          <div className='flex h-fit w-full flex-col justify-between rounded-md bg-orange-100 px-8 py-4 md:h-72 md:w-2/3 lg:h-56'>
            <div>
              Get a head start by loading demo content into your theme.{' '}
              <strong>Click the button below to see a sample setup.</strong>
            </div>
            <button
              className='z-50 mt-6 rounded-md bg-primary px-4 py-2 text-center text-white'
              disabled={isSeedLoading}
              type='button'
              onClick={handleSeedData}>
              {isSeedLoading ? `data loading...` : `Load Demo data`}
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default WelcomePage
