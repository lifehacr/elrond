import Container from '../common/Container'
import Link from 'next/link'

import Facebook from '@/svg/Facebook'
import Github from '@/svg/Github'
import Logo from '@/svg/Logo'
import Twitter from '@/svg/Twitter'

const Footer = () => {
  const x =
    'w-full md:max-w-screen-container flex flex-col md:flex-row justify-between'
  return (
    <div className='border-t'>
      <Container className='md:max-w-screen-[940px] w-full px-4 pt-2'>
        <div className='flex flex-col justify-between gap-6 py-8 sm:py-12 md:flex-row md:gap-5'>
          <div className='flex flex-col justify-start gap-5'>
            <Link href={'/'}>
              <Logo className='h-6 w-fit' />
            </Link>
            <p className='text-lg font-normal leading-normal md:max-w-xs'>
              A super minimal & lightweight theme with Premium Membership and
              fully Ghost-compatible.
            </p>
          </div>
          <div className='flex gap-16'>
            <div className='flex flex-col items-start justify-start gap-3'>
              <div className='mb-2 text-xs font-[450] uppercase tracking-widest text-[#3F3F46]'>
                membership
              </div>
              <div>
                <ul className='flex flex-col gap-3 text-[15px] font-light leading-[18px] text-neutral-content underline hover:text-base-content sm:no-underline'>
                  <Link href={'/membership'}>Plans</Link>
                  <Link href={'/sign-in'}>Sign In</Link>
                  <Link href={'/sign-up'}>Sign Up</Link>
                  <Link href={'/subscribe'}>Subscribe</Link>
                  <Link href={'/'}>Portal</Link>
                </ul>
              </div>
            </div>
            <div className='flex flex-col items-start justify-start gap-3'>
              <div className='mb-2 text-xs font-[450] uppercase tracking-widest text-[#3F3F46]'>
                links
              </div>
              <div>
                <ul className='flex flex-col gap-3 text-[15px] font-light leading-[18px] text-neutral-content underline hover:text-base-content sm:no-underline'>
                  <Link href={'/contact'}>Contact</Link>
                  <Link href={'/404'}>404 Page</Link>
                  <Link href={'/documentation'}>Documentation</Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col-reverse items-center justify-center gap-4 py-4 text-center sm:flex-row  sm:items-center sm:justify-between sm:gap-12'>
          <p className='py-2 text-sm font-light text-[#3F3F46]'>
            © 2024 Elrond — Published with Ghost & Elrond
          </p>
          <div className='flex gap-5'>
            <Link href={'/'}>
              <Facebook />
            </Link>
            <Link href={'/'}>
              <Twitter />
            </Link>
            <Link href={'/'}>
              <Github />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
