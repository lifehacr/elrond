import Button from '../../common/Button'
import { Media, User } from '@payload-types'
import { useState } from 'react'

import HeroImageSkeleton from '@/components/skeletons/HeroImageSkeleton'
import Globe from '@/svg/Globe'
import Twitter from '@/svg/Twitter'

const AuthorHero = ({ author }: { author: User }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className='flex flex-col items-center bg-base-100 pb-16 pt-14'>
      <div className='avatar'>
        <div className='relative w-24 rounded-full'>
          {!imageLoaded && <HeroImageSkeleton />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onLoad={() => setImageLoaded(true)}
            alt='Author'
            src={(author?.imageUrl as Media)?.url!}
          />
        </div>
      </div>
      <div className='mt-6 text-xl font-bold'>{author?.displayName}</div>
      <div className='mt-5 flex gap-4'>
        <Button className='hover:bg-base-150 !rounded-full'>
          <Twitter /> @hedwick
        </Button>
        <Button className='hover:bg-base-150 !rounded-full'>
          <Globe /> cagatiya.io
        </Button>
      </div>
    </div>
  )
}

export default AuthorHero
