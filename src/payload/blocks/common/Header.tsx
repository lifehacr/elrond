'use client'

import Button from '../common/Button'
import Container from '../common/Container'
import DropDown from '../common/DropDown'
import { Media, Page, SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import LockIcon from '@/svg/LockIcon'
import MenuIcon from '@/svg/MenuIcon'
import SearchIcon from '@/svg/SearchIcon'
import { trpc } from '@/trpc/client'

const Header = ({ initData }: { initData: SiteSetting }) => {
  const router = useRouter()
  const pathName = usePathname()
  const { data } = trpc.user.getUser.useQuery()

  const handleSignPage = () => {
    router.push('/sign-in')
  }

  function capitalizeFirstLetter(string: string) {
    if (!string) return string
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    pathName !== '/contact' &&
    pathName !== '/subscribe' && (
      <div className='bg-base-100'>
        <Container className='flex h-20 items-center justify-between bg-base-100 px-4 xl:px-0'>
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
                      href={(headerLink?.menuLink?.page?.value as Page)?.slug!}>
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
  )
}

export default Header
