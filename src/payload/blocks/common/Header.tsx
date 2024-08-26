'use client'

import Button from '../common/Button'
import Container from '../common/Container'
import DropDown from '../common/DropDown'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { toast } from 'sonner'

import Modal from '@/components/common/Modal'
import LockIcon from '@/svg/LockIcon'
import Logo from '@/svg/Logo'
import MenuIcon from '@/svg/MenuIcon'
import SearchIcon from '@/svg/SearchIcon'
import { trpc } from '@/trpc/client'

const Header = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const pathName = usePathname()
  const { data } = trpc.user.getUser.useQuery()
  const ref = useRef(null)

  const { mutate: getBlogsBySearch, data: searchResult } =
    trpc.search.getBlogsBySearch.useMutation({
      onError: async () => {
        toast.error('There is some issue!')
      },
    })

  console.log('Search result', searchResult)

  const handleSignPage = () => {
    router.push('/sign-in')
  }

  console.log('frontend data: ', searchResult)

  const handleSearch = (e: any) => {
    e.target.value.length >= 1
      ? getBlogsBySearch({ searchParam: e.target.value })
      : ''
  }

  return (
    <div className=''>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
          ref.current = null
        }}>
        <div className='relative h-auto w-full rounded-lg bg-white md:w-[30rem]'>
          <IoSearch
            size={17}
            className='text-muted-foreground absolute left-4 top-[1.41rem]  transform'
          />
          <input
            ref={ref}
            onChange={e => {
              handleSearch(e)
            }}
            className=' text-md  flex h-16 w-full  rounded-t-lg border-b-[1px] pl-10 shadow-sm outline-none'
            placeholder='Search posts, tags and authors'
          />
          <div
            onClick={() => setOpen(false)}
            className='flex max-h-96 flex-col gap-y-4 overflow-y-scroll pt-2'>
            {searchResult?.map((result, index) => {
              if (result?.doc?.relationTo === 'blogs') {
                return (
                  <div
                    key={index}
                    className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]
              '>
                    <Link href={result?.path || ''}>
                      {' '}
                      <h2 className='text-[1.1rem] font-medium leading-tight text-neutral-800'>
                        {result?.title}
                      </h2>
                    </Link>
                    <p className='mb-0 mt-0 line-clamp-1 text-sm leading-normal text-neutral-400'>
                      {result?.description}
                    </p>
                  </div>
                )
              } else if (result?.doc?.relationTo === 'tags') {
                return (
                  <div
                    key={index}
                    className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]
              '>
                    <Link href={result?.path || ''}>
                      {' '}
                      <h2 className='text-[1.1rem] font-medium leading-tight text-neutral-800'>
                        # {result?.title}
                      </h2>
                    </Link>
                  </div>
                )
              } else if (result?.doc?.relationTo === 'users') {
                return (
                  <div
                    key={index}
                    className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]
              '>
                    <Link
                      className='flex items-center space-x-1'
                      href={result?.path || ''}>
                      <Image
                        alt='user image'
                        height={34}
                        width={34}
                        className='rounded-full'
                        src={result?.imageUrl || '/images/avatar/avatar_5.jpg'}
                      />
                      <h2 className='text-[1.1rem] font-medium leading-tight text-neutral-800'>
                        {result?.title}
                      </h2>
                    </Link>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </Modal>
      <Container className='z-50 flex h-20 items-center justify-between bg-base-100 px-4 xl:px-0'>
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
          <Button
            onClick={() => setOpen(true)}
            className='h-[34px] w-[34px] !rounded-full bg-neutral-content bg-opacity-5 px-1 hover:bg-inherit'>
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
