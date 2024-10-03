'use client'

import type { Media, Page, SiteSetting } from '@payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { FaXTwitter } from 'react-icons/fa6'
import { IconType } from 'react-icons/lib'

import Container from '@/payload/blocks/common/Container'

import { Avatar, AvatarFallback, AvatarImage } from './common/AvatarComponent'

type SocialLinksType = NonNullable<
  Pick<SiteSetting, 'footer'>['footer']['socialLinks']
>[0]

const SocialIcons: { [key in SocialLinksType['platform']]: IconType | null } = {
  facebook: AiFillFacebook,
  github: AiFillGithub,
  instagram: null,
  linkedin: null,
  medium: null,
  pinterest: null,
  quora: null,
  reddit: null,
  snapchat: null,
  telegram: null,
  tiktok: null,
  tumblr: null,
  twitter: FaXTwitter,
  whatsapp: null,
  youtube: null,
  discord: null,
  website: null,
}

const Footer = ({ metadata }: { metadata: SiteSetting }) => {
  const { footer, general } = metadata
  const { logo, socialLinks, footerLinks } = footer
  const pathName = usePathname()

  let logoDetails = {
    url: '',
    alt: '',
  }

  if (Object.keys(logo).length && logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl !== 'string') {
    logoDetails = {
      url: logo.imageUrl?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
    }
  }

  // if in case image or nav-links are not specified hiding the footer
  if (
    !logoDetails.url &&
    footerLinks?.length === 0 &&
    socialLinks?.length === 0
  ) {
    return null
  }

  return (
    pathName !== '/contact' &&
    pathName !== '/subscribe' && (
      <div className='border-t border-[#E5E7EB]'>
        <Container className='md:max-w-screen-[940px] w-full px-4 pt-2'>
          <div className='flex flex-col justify-between gap-6 py-8 sm:py-12 md:flex-row md:gap-5'>
            <div className='flex flex-col justify-start gap-5'>
              <Link href={'/'} className='relative h-6 w-28'>
                <Avatar className='h-full w-full !rounded-none'>
                  <AvatarImage
                    alt={logo?.description || ''}
                    src={(logo?.imageUrl as Media)?.url!}
                    className='!rounded-none'
                  />
                  <AvatarFallback />
                </Avatar>
              </Link>
              <p className='text-lg font-normal leading-normal md:max-w-xs'>
                {general?.description}
              </p>
            </div>
            <div className='flex gap-16'>
              {footerLinks?.map((footerLink, index) => (
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
                            link?.type === 'reference' ? (
                              <Link
                                target={`${link?.type === 'reference' ? '_blank' : '_self'}`}
                                key={index}
                                href={`/${link?.url!}`}>
                                {link?.label}
                              </Link>
                            ) : (
                              <Link
                                key={index}
                                target={`${link?.type === 'custom' ? '_self' : '_blank'}`}
                                href={`/${(link?.page?.value as Page)?.slug!}`}>
                                {(link?.page?.value as Page)?.title}
                              </Link>
                            ),
                        )
                      ) : footerLink?.menuLink?.type === 'custom' ? (
                        <Link
                          target={`${footerLink?.menuLink?.page ? '_blank' : '_self'}`}
                          href={`/${footerLink?.menuLink?.page!}`}>
                          {footerLink?.menuLink?.label}
                        </Link>
                      ) : (
                        <Link
                          target={`${footerLink?.menuLink?.page ? '_blank' : '_self'}`}
                          href={`/${(footerLink?.menuLink?.page?.value as Page)
                            ?.slug!}`}>
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
              {footer?.copyright}
            </p>
            <div className='flex gap-5'>
              {socialLinks?.map((link: SocialLinksType, index) => {
                const IconComponent =
                  SocialIcons[link?.platform as keyof typeof SocialIcons]
                return (
                  <Link key={index} href={link?.value || '/'}>
                    {IconComponent ? <IconComponent /> : null}
                  </Link>
                )
              })}
            </div>
          </div>
        </Container>
      </div>
    )
  )
}

export default Footer
