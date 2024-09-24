import Button from '../../common/Button'
import { User } from '@payload-types'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/AvatarComponent'
import Globe from '@/svg/Globe'
import Twitter from '@/svg/Twitter'

const AuthorHero = ({ author }: { author: User }) => {
  return (
    <div className='flex flex-col items-center bg-base-100 pb-16 pt-14'>
      <div className='avatar'>
        <div className='relative w-24 rounded-full'>
          <Avatar className='h-full w-full'>
            <AvatarImage alt='Author' src={author?.imageUrl!} />
            <AvatarFallback />
          </Avatar>
        </div>
      </div>
      <div className='mt-6 text-xl font-bold'>{author?.displayName}</div>
      <div className='mt-5 font-semibold text-neutral-content'>
        {author?.city}
      </div>
      <p className='mt-5  max-w-sm text-center text-neutral-content'>
        {author?.description}
      </p>
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
