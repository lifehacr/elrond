'use client'

import Container from '../common/Container'
import { HeroType, Media } from '@payload-types'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Hero: React.FC<HeroType> = ({ ...block }) => {
  const pathName = usePathname()

  return (
    <div className='bg-base-100'>
      <Container>
        <div
          className={`flex flex-col items-center gap-6 px-4 ${pathName === '/' ? 'py-16' : 'pb-16 pt-14'}`}>
          <div className='avatar'>
            <div
              className={`relative ${pathName === '/' ? 'w-20' : 'w-24'} rounded-full`}>
              <Image
                src={(block?.image as Media)?.url!}
                alt={(block?.image as Media)?.alt || 'Hero Image'}
                fill
                className='rounded-full'
              />
            </div>
          </div>
          <div className='text-center'>
            {block?.title !== '' ? (
              <div className='text-xl font-semibold leading-tight sm:text-2xl sm:leading-none'>
                {block?.title}
              </div>
            ) : (
              ''
            )}
            <p
              className={`max-w-sm text-center leading-[1.48rem] ${pathName === '/' ? 'text-base font-[450] leading-7 text-base-content sm:text-lg' : 'mt-4 text-base font-light text-[#3F3F46]'}`}>
              {block?.description}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
