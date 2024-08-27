'use client'

import Container from '../common/Container'
import { Media, Page, SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Facebook from '@/svg/Facebook'
import Github from '@/svg/Github'
import Twitter from '@/svg/Twitter'

const icons = {
  facebook: <Facebook />,
  github: <Github />,
  twitter: <Twitter />,
}

const Footer = ({ initData }: { initData: SiteSetting }) => {
  const pathName = usePathname()
  return (
    pathName !== '/contact' &&
    pathName !== '/subscribe' && (
      <div className='border-t'>
        <Container className='md:max-w-screen-[940px] w-full px-4 pt-2'>
          <div className='flex flex-col justify-between gap-6 py-8 sm:py-12 md:flex-row md:gap-5'>
            <div className='flex flex-col justify-start gap-5'>
              <Link href={'/'} className='relative h-6 w-28'>
                <Image
                  alt={(initData?.logoImage as Media)?.alt || 'Logo'}
                  src={(initData?.logoImage as Media)?.url!}
                  fill
                />
              </Link>
              <p className='text-lg font-normal leading-normal md:max-w-xs'>
                {initData?.appDescription}
              </p>
            </div>
            <div className='flex gap-16'>
              {initData?.footer?.links?.map((footerLink, index) => (
                <div
                  key={index}
                  className='flex flex-col items-start justify-start gap-3'>
                  <div className='mb-2 text-xs font-[450] uppercase tracking-widest text-[#3F3F46]'>
                    {footerLink?.group && footerLink?.menuLinkGroup?.groupTitle}
                  </div>
                  <div>
                    <ul className='flex flex-col gap-3 text-[15px] font-light leading-[18px] text-neutral-content underline hover:text-base-content sm:no-underline'>
                      {footerLink?.group ? (
                        footerLink?.menuLinkGroup?.groupLinks?.map(
                          (link, index) =>
                            link?.externalLink ? (
                              <Link
                                target={`${link?.newPage ? '_blank' : '_self'}`}
                                key={index}
                                href={link?.link!}>
                                {link?.label}
                              </Link>
                            ) : (
                              <Link
                                key={index}
                                target={`${link?.newPage ? '_blank' : '_self'}`}
                                href={(link?.page?.value as Page)?.slug!}>
                                {(link?.page?.value as Page)?.title}
                              </Link>
                            ),
                        )
                      ) : footerLink?.menuLink?.externalLink ? (
                        <Link
                          target={`${footerLink?.menuLink?.newPage ? '_blank' : '_self'}`}
                          href={footerLink?.menuLink?.link!}>
                          {footerLink?.menuLink?.label}
                        </Link>
                      ) : (
                        <Link
                          target={`${footerLink?.menuLink?.newPage ? '_blank' : '_self'}`}
                          href={
                            (footerLink?.menuLink?.page?.value as Page)?.slug!
                          }>
                          {(footerLink?.menuLink?.page?.value as Page)?.title}
                        </Link>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex w-full flex-col-reverse items-center justify-center gap-4 py-4 text-center sm:flex-row  sm:items-center sm:justify-between sm:gap-12'>
            <p className='py-2 text-sm font-light text-[#3F3F46]'>
              {initData?.footer?.copyright}
            </p>
            <div className='flex gap-5'>
              {initData?.footer?.socialLinks?.map((link, index) => (
                <Link key={index} href={link?.socialMediaLink || '/'}>
                  {icons[link?.socialMedia]}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    )
  )
}

export default Footer
