'use client'

import Button from '../common/Button'
import Container from '../common/Container'
import DropDown from '../common/DropDown'
import { Media, Page, SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { toast } from 'sonner'

import Modal from '@/components/common/Modal'
import LockIcon from '@/svg/LockIcon'
import MenuIcon from '@/svg/MenuIcon'
import SearchIcon from '@/svg/SearchIcon'
import { trpc } from '@/trpc/client'
import { signOut } from '@/utils/signOut'

const Header = ({ initData }: { initData: SiteSetting }) => {
  const pathName = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const { data: user } = trpc.user.getUser.useQuery()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const { mutate: getBlogsBySearch, data: searchResult } =
    trpc.search.getBlogsBySearch.useMutation({
      onError: async () => {
        toast.error('There is some issue!')
      },
    })

  const handleSignPage = () => {
    router.push('/sign-in')
  }
  const handleLogOut = () => {
    signOut()
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    e.target.value.length >= 1
      ? getBlogsBySearch({ searchParam: e.target.value })
      : ''
  }

  function capitalizeFirstLetter(string: string) {
    if (!string) return string
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    pathName !== '/contact' &&
    pathName !== '/subscribe' && (
      <div className='bg-base-100'>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false)
            setSearchInput('')
          }}>
          <div className='relative h-auto w-full rounded-lg bg-white md:w-[30rem]'>
            {searchInput.length === 0 ? (
              <IoSearch
                size={17}
                className='text-muted-foreground absolute left-4 top-[1.41rem]  transform'
              />
            ) : (
              <IoMdClose
                size={17}
                onClick={() => setSearchInput('')}
                className='text-muted-foreground absolute left-4 top-[1.41rem] transform cursor-pointer'
              />
            )}
            <input
              onChange={handleSearch}
              value={searchInput}
              className='text-md flex h-16 w-full rounded-lg border-b-[1px] pl-10 shadow-sm outline-none'
              placeholder='Search posts, tags and authors'
            />
            <div
              onClick={() => {
                setOpen(false)
                setSearchInput('')
              }}
              className='flex max-h-96 flex-col gap-y-4 overflow-y-scroll'>
              {searchInput.length >= 1 &&
                searchResult?.map((result, index) => {
                  if (result?.doc?.relationTo === 'blogs') {
                    return (
                      <div
                        key={index}
                        className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]'>
                        <Link href={result?.path || ''}>
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
                        className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]'>
                        <Link href={result?.path || ''}>
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
                        className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]'>
                        <Link
                          className='flex items-center space-x-1'
                          href={result?.path || ''}>
                          <Image
                            alt='user image'
                            height={34}
                            width={34}
                            className='rounded-full'
                            src={
                              result?.imageUrl || '/images/avatar/avatar_5.jpg'
                            }
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
          <Link href={'/'} className='relative h-5 w-24'>
            <Image alt='' src={(initData?.logoImage as Media)?.url!} fill />
          </Link>
          <nav className='mx-auto hidden h-full select-none items-center justify-center lg:flex'>
            <ul className='flex items-center gap-6 text-base font-[450] text-[#3F3F46]'>
              {initData?.header?.menuLinks?.map((headerLink, index) => (
                <ul
                  key={index}
                  className='flex items-center gap-6 text-base font-[450] text-[#3F3F46]'>
                  {headerLink?.group ? (
                    <DropDown headerLink={headerLink} />
                  ) : headerLink?.menuLink?.externalLink ? (
                    <Link
                      target={`${headerLink?.menuLink?.newPage ? '_blank' : '_self'}`}
                      href={headerLink?.menuLink?.link!}>
                      {capitalizeFirstLetter(headerLink?.menuLink?.label!)}
                    </Link>
                  ) : (
                    <Link
                      target={`${headerLink?.menuLink?.newPage ? '_blank' : '_self'}`}
                      href={`/${(headerLink?.menuLink?.page?.value as Page)?.slug!}`}>
                      {capitalizeFirstLetter(
                        (headerLink?.menuLink?.page?.value as Page)?.title,
                      )}
                    </Link>
                  )}
                </ul>
              ))}
            </ul>
          </nav>
          <div className='xs:gap-x-4 flex h-full items-center justify-end gap-x-3'>
            {' '}
            <Button
              onClick={() => setOpen(true)}
              className='h-[34px] w-[34px] !rounded-full bg-neutral-content bg-opacity-5 px-1 hover:bg-inherit'>
              <SearchIcon />
            </Button>
            {user ? (
              <Button
                className='h-[34px] !rounded-full bg-primary font-medium text-white'
                onClick={handleLogOut}>
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
            <Button
              onClick={toggleMenu}
              className='h-[34px] w-[34px] !rounded-full p-0 lg:hidden'>
              <MenuIcon />
            </Button>
          </div>
        </Container>
        {isMenuOpen && (
          <div className='fixed inset-0 z-50 flex flex-col bg-white'>
            <div className='flex h-20 w-full items-center justify-between px-4 py-4'>
              <Link href={'/'} className='relative h-5 w-24'>
                <Image alt='' src={(initData?.logoImage as Media)?.url!} fill />
              </Link>
              <div className='flex gap-x-3'>
                <Button
                  onClick={() => setOpen(true)}
                  className='h-[34px] w-[34px] !rounded-full bg-neutral-content bg-opacity-5 px-1 hover:bg-inherit'>
                  <SearchIcon />
                </Button>
                <Button
                  className='h-[34px] !rounded-full bg-primary font-medium text-white hover:bg-[#805AE9]'
                  onClick={handleSignPage}>
                  <span className='hidden text-inherit sm:inline'>✦</span>
                  <span className='hidden sm:inline'> Sign in</span>
                  <LockIcon className='inline sm:hidden' />
                </Button>
                <Button
                  className='h-[34px] w-[34px] !rounded-full bg-neutral-content bg-opacity-5 p-0'
                  onClick={toggleMenu}>
                  <MenuIcon />
                </Button>
              </div>
            </div>
            <ul className='flex flex-col items-center justify-center gap-4 text-lg'>
              {initData?.header?.menuLinks?.map((headerLink, index) => (
                <ul
                  key={index}
                  className='flex items-center gap-6 text-base font-[450] text-[#3F3F46]'>
                  {headerLink?.group ? (
                    <DropDown headerLink={headerLink} />
                  ) : headerLink?.menuLink?.externalLink ? (
                    <Link
                      onClick={toggleMenu}
                      target={`${headerLink?.menuLink?.newPage ? '_blank' : '_self'}`}
                      href={headerLink?.menuLink?.link!}>
                      {capitalizeFirstLetter(headerLink?.menuLink?.label!)}
                    </Link>
                  ) : (
                    <Link
                      onClick={toggleMenu}
                      target={`${headerLink?.menuLink?.newPage ? '_blank' : '_self'}`}
                      href={`/${(headerLink?.menuLink?.page?.value as Page)?.slug!}`}>
                      {capitalizeFirstLetter(
                        (headerLink?.menuLink?.page?.value as Page)?.title,
                      )}
                    </Link>
                  )}
                </ul>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  )
}

export default Header
