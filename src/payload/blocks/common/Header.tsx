'use client'

import Button from '../common/Button'
import Container from '../common/Container'
import DropDown from '../common/DropDown'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import LockIcon from '@/svg/LockIcon'
import Logo from '@/svg/Logo'
import MenuIcon from '@/svg/MenuIcon'
import SearchIcon from '@/svg/SearchIcon'
import { trpc } from '@/trpc/client'

const Header = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { data } = trpc.user.getUser.useQuery()

  const handleSignPage = () => {
    router.push('/sign-in')
  }

  return (
    <div className='bg-base-100'>
      <Container className='flex h-20 items-center justify-between bg-base-100 px-4 xl:px-0'>
        <div className='flex-[1] justify-start'>
          <Link href={'/'}>
            <Logo className='h-5 w-fit' />
          </Link>
        </div>
        <nav className='mx-auto hidden h-full w-fit select-none items-center justify-center gap-6 px-4 lg:flex'>
          <ul className='mx-auto flex w-fit items-center gap-6 px-4 text-base font-[450] text-[#3F3F46]'>
            <Link
              href={'/style-guide'}
              className={
                pathName === '/style-guide' ? 'text-secondary-content' : ''
              }>
              Style Guide{' '}
              <span className='inline-block bg-gradient-to-r from-[#FED7AA] to-[#F97316] bg-clip-text text-transparent'>
                ✦
              </span>
            </Link>
            <Link
              href={'/features'}
              className={
                pathName === '/features' ? 'text-secondary-content' : ''
              }>
              Features
            </Link>
            <Link
              href={'/membership'}
              className={
                pathName === '/membership' ? 'text-secondary-content' : ''
              }>
              Membership
            </Link>
            <Link
              href={'/author'}
              className={
                pathName === '/author' ? 'text-secondary-content' : ''
              }>
              Authors
            </Link>
            <Link
              href={'/tag'}
              className={pathName === '/tag' ? 'text-secondary-content' : ''}>
              Tags
            </Link>
            <DropDown />
          </ul>
        </nav>
        <div className='xs:gap-x-4 flex h-full w-fit min-w-fit flex-[1] items-center justify-end gap-x-3'>
          <Button className='h-[34px] w-[34px] !rounded-full bg-neutral-content bg-opacity-5 px-1 hover:bg-inherit'>
            <SearchIcon />
          </Button>
          {data?.username ? (
            <Button
              className='h-[34px] !rounded-full bg-primary font-medium text-white'
              onClick={handleSignPage}>
              <span className='hidden text-inherit sm:inline'>✦</span>
              <span className='sm:inline'> logout</span>
            </Button>
          ) : (
            <Button
              className='h-[34px] !rounded-full bg-primary font-medium text-white'
              onClick={handleSignPage}>
              <span className='hidden text-inherit sm:inline'>✦</span>
              <span className='hidden sm:inline'> Sign in</span>
              <LockIcon className='inline sm:hidden' />
            </Button>
          )}
          <Button className='h-[34px] w-[34px] !rounded-full p-0 lg:hidden'>
            <MenuIcon />
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default Header
