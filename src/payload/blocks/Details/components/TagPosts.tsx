'use client'

import Button from '../../common/Button'
import { Blog, Media, Tag, User } from '@payload-types'
import Link from 'next/link'
import { useState } from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/AvatarComponent'

const TagPosts = ({
  blogPosts,
  tagDetails,
}: {
  blogPosts: Blog[]
  tagDetails: Tag | undefined
}) => {
  const [noOfPosts, setNoOfPosts] = useState(6)
  const [loading, setLoading] = useState(false)

  const loadPosts = () => {
    setLoading(true)
    setTimeout(() => {
      setNoOfPosts(noOfPosts + 6)
      setLoading(false)
    }, 1000)
  }
  return (
    <div className='mx-auto my-16 flex w-full flex-col gap-5 px-4 md:max-w-screen-sm md:px-0'>
      <div className='flex'>
        <div className='text-sm font-semibold text-secondary-content '>
          {tagDetails?.title?.toUpperCase()}
        </div>
        <div className='mx-2'>-</div>
        <div className='text-sm font-semibold text-secondary-content  '>
          {blogPosts?.length}
          {blogPosts?.length === 1 ? ' POST' : ' POSTS'}
        </div>
      </div>
      <div className='space-y-14'>
        {blogPosts?.slice(0, noOfPosts)?.map((post, index) => (
          <div key={index} className='flex flex-col gap-7 md:flex-row'>
            <div className='avatar'>
              <Link
                href={`/${post?.slug}`}
                className='relative h-60 w-full md:h-28 md:w-28'>
                <Avatar className='h-full w-full rounded-xl md:rounded-full'>
                  <AvatarImage
                    src={(post?.blogImage as Media)?.url!}
                    alt='Post'
                  />
                  <AvatarFallback className='rounded-xl md:rounded-full' />
                </Avatar>
              </Link>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <Link
                  href={`/${post?.slug}`}
                  className='text-xl font-semibold text-base-content'>
                  {post?.title}
                </Link>
                <div className='flex'>
                  <div className='flex -space-x-2'>
                    {post?.author?.slice(0, 2)?.map((author, index) => (
                      <Link
                        key={index}
                        href={`/author/${(author?.value as User)?.username}`}>
                        <Avatar className='h-[26px] w-[26px]'>
                          <AvatarImage
                            alt='Author'
                            src={(author?.value as User)?.imageUrl!}
                            className='border-2 border-white transition-transform duration-300 hover:scale-110 hover:transform'
                          />
                          <AvatarFallback />
                        </Avatar>
                      </Link>
                    ))}
                  </div>
                  <div className='flex'>
                    {post?.author?.slice(0, 2)?.map((author, index) => (
                      <div key={index}>
                        <Link
                          className='ml-2 hover:text-primary'
                          href={`/author/${(author?.value as User)?.username}`}>
                          {(author?.value as User)?.displayName}
                        </Link>
                        {index === 0 && post?.author?.length! > 1 && (
                          <span className='mx-1'>&</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <p>{post?.description}</p>
              </div>
              <div className='flex gap-2'>
                {post?.tags?.map((tag, index) => (
                  <Link key={index} href={`/tag/${(tag?.value as Tag)?.slug}`}>
                    <div className='badge badge-secondary badge-lg rounded-lg border border-zinc-200 text-xs font-semibold hover:opacity-80'>
                      {(tag?.value as Tag)?.title?.toUpperCase()}
                    </div>
                  </Link>
                ))}
                {index === 0 && (
                  <div className='badge badge-warning badge-lg rounded-lg border border-[#FEC896] text-xs font-semibold text-error '>
                    ✦ PREMIUM
                  </div>
                )}
                {index === 2 && (
                  <div className='border-black/0.1 badge badge-primary badge-lg rounded-lg border text-xs font-semibold text-base-100'>
                    ✽ MEMBER
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {blogPosts?.length <= noOfPosts ? (
        ''
      ) : (
        <div className='mt-8 flex items-center justify-center'>
          <Button
            onClick={loadPosts}
            className='hover:bg-base-150 btn-secondary !rounded-full text-xs uppercase'
            disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default TagPosts
