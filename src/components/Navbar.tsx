'use client'

import type { Media, Page, SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { toast } from 'sonner'

import Button from '@/payload/blocks/common/Button'
import Container from '@/payload/blocks/common/Container'
import DropDown from '@/payload/blocks/common/DropDown'
import ProfileDropdown from '@/payload/blocks/common/ProfileDropdown'
import LockIcon from '@/svg/LockIcon'
import MenuIcon from '@/svg/MenuIcon'
import SearchIcon from '@/svg/SearchIcon'
import { trpc } from '@/trpc/client'
import { generateMenuLinks } from '@/utils/generateMenuLinks'

import Modal from './common/Modal'

const Navbar = ({ metadata }: { metadata: SiteSetting }) => {
  const [open, setOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const { navbar } = metadata
  const { logo, menuLinks } = navbar
  const { data: user } = trpc.user.getUser.useQuery()
  const pathName = usePathname()
  const router = useRouter()

  let logoDetails = {
    url: '',
    alt: '',
  }

  const navLinks = menuLinks?.length ? generateMenuLinks(menuLinks) : []

  if (Object.keys(logo).length && typeof logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl === 'object') {
    logoDetails = {
      url: logo.imageUrl?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
    }
  }

  // if in case image or nav-links are not specified hiding the navbar
  if (!logoDetails.url && navLinks?.length === 0) {
    return null
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignPage = () => {
    router.push('/sign-in')
  }

  const { mutate: getBlogsBySearch, data: searchResult } =
    trpc.search.getBlogsBySearch.useMutation({
      onError: async () => {
        toast.error('There is some issue!')
      },
    })

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
    pathName !== '/subscribe' && (
      <header className='bg-base-100'>
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
                        <Link href={'/' + result?.path || ''}>
                          <h2 className='text-neutral-800 text-[1.1rem] font-medium leading-tight'>
                            {result?.title}
                          </h2>
                        </Link>
                        <p className='text-neutral-400 mb-0 mt-0 line-clamp-1 text-sm leading-normal'>
                          {result?.description}
                        </p>
                      </div>
                    )
                  } else if (result?.doc?.relationTo === 'tags') {
                    return (
                      <div
                        key={index}
                        className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]'>
                        <Link href={'/tag/' + result?.path || ''}>
                          <h2 className='text-neutral-800 text-[1.1rem] font-medium leading-tight'>
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
                          href={'/author/' + result?.path || ''}>
                          <Image
                            alt='user image'
                            height={34}
                            width={34}
                            className='rounded-full'
                            src={
                              result?.imageUrl || '/images/avatar/avatar_5.jpg'
                            }
                          />
                          <h2 className='text-neutral-800 text-[1.1rem] font-medium leading-tight'>
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
            <Image
              alt={logo?.description || ''}
              src={(logo?.imageUrl as Media)?.url!}
              fill
            />
          </Link>
          <nav className='mx-auto hidden h-full select-none items-center justify-center lg:flex'>
            <ul className='flex items-center gap-6 text-base font-[450] text-[#3F3F46]'>
              {menuLinks?.map((headerLink, index) => (
                <ul
                  key={index}
                  className='flex items-center gap-6 text-base font-[450] text-[#3F3F46]'>
                  {headerLink?.group ? (
                    <DropDown headerLink={headerLink} />
                  ) : headerLink?.menuLink?.url ? (
                    <Link
                      target={`${headerLink?.menuLink?.page ? '_self' : '_blank'}`}
                      href={`/${headerLink?.menuLink?.url!}`}>
                      {capitalizeFirstLetter(headerLink?.menuLink?.label!)}
                    </Link>
                  ) : (
                    <Link
                      // target={`${headerLink?.menuLink?.page ? '_blank' : '_self'}`}
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
              className='flex h-[34px] w-[34px] items-center justify-center !rounded-full bg-neutral-content bg-opacity-5 hover:bg-inherit'>
              <SearchIcon />
            </Button>
            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <Button
                className='flex h-[34px] w-[34px] items-center justify-center !rounded-full bg-primary pl-4 pr-4 font-medium text-white sm:w-full'
                onClick={handleSignPage}>
                <span className='hidden text-inherit sm:inline'>✦</span>
                <span className='hidden sm:inline'> Sign in</span>
                <span className='xs:hidden block font-medium'>
                  <LockIcon className='inline sm:hidden' />
                </span>
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
                <Image
                  alt={logo?.description || ''}
                  src={(logo?.imageUrl as Media)?.url!}
                  fill
                />
              </Link>
              <div className='flex gap-x-3'>
                <Button
                  onClick={() => setOpen(true)}
                  className='flex h-[34px] w-[34px] items-center justify-center !rounded-full bg-neutral-content bg-opacity-5 hover:bg-inherit'>
                  <SearchIcon />
                </Button>
                <Button
                  className='flex h-[34px] w-[34px] items-center justify-center !rounded-full bg-primary font-medium text-white hover:bg-[#805AE9] sm:w-full'
                  onClick={handleSignPage}>
                  <span className='hidden text-inherit sm:inline'>✦</span>
                  <span className='hidden sm:inline'> Sign in</span>
                  <LockIcon className='inline sm:hidden' />
                </Button>
                <Button
                  className='flex h-[34px] w-[34px] items-center justify-center !rounded-full bg-neutral-content bg-opacity-5 p-0'
                  onClick={toggleMenu}>
                  <MenuIcon />
                </Button>
              </div>
            </div>
            <ul className='flex flex-col items-center justify-center gap-4 text-lg'>
              {menuLinks?.map((headerLink, index) => (
                <ul
                  key={index}
                  className='flex items-center gap-6 text-base font-[450] text-[#3F3F46]'>
                  {headerLink?.group ? (
                    <DropDown headerLink={headerLink} />
                  ) : headerLink?.menuLink?.url ? (
                    <Link
                      onClick={toggleMenu}
                      target={`${headerLink?.menuLink?.page ? '_blank' : '_self'}`}
                      href={headerLink?.menuLink?.url!}>
                      {capitalizeFirstLetter(headerLink?.menuLink?.label!)}
                    </Link>
                  ) : (
                    <Link
                      onClick={toggleMenu}
                      target={`${headerLink?.menuLink?.page ? '_blank' : '_self'}`}
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
      </header>
    )
  )
}

export default Navbar
