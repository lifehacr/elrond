'use client'

import { useRouter } from 'next/navigation'

import Button from '@/payload/blocks/common/Button'
import Container from '@/payload/blocks/common/Container'
import SadEmoji from '@/svg/SadEmoji'

import Logo from './svg/Logo'

const PageNotFound = () => {
  const router = useRouter()
  return (
    <Container className='flex min-h-screen items-center justify-center md:max-w-screen-sm'>
      <div className='flex flex-col items-center gap-6 px-4'>
        <div className='text-secondary-content'>
          <SadEmoji />
        </div>
        <div className='animate-grayscale-pulse'>
          <Logo />
        </div>
        <div>404 | NOT FOUND</div>
        <div>
          <Button
            className='!rounded-full text-xs font-medium hover:bg-secondary'
            onClick={() => router.push('/')}>
            BACK TO HOME PAGE
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default PageNotFound
