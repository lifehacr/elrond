'use client'

import Button from '../../common/Button'
import { Blog, Media, Tag, User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

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
            {/* <div className='avatar'> */}
            <Link
              href={`/${post?.slug}`}
              className='relative h-60 w-full flex-shrink-0 md:h-28 md:w-28'>
              <Image
                src={(post?.blogImage as Media)?.url!}
                alt='Post'
                fill
                className='rounded-xl object-cover md:rounded-full'
              />
            </Link>
            {/* </div> */}

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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image
                          alt='Author'
                          src={
                            ((author?.value as User)?.imageUrl as Media)?.url!
                          }
                          height={26}
                          width={26}
                          className='rounded-full border-2 border-white transition-transform duration-300 hover:scale-110 hover:transform'
                        />
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
                    <div className='badge-lg rounded-lg border border-zinc-200 bg-secondary px-3 py-[2px] text-xs font-semibold hover:opacity-80'>
                      {(tag?.value as Tag)?.title?.toUpperCase()}
                    </div>
                  </Link>
                ))}
                {index === 0 && (
                  <div className='badge-lg rounded-lg border border-[#FEC896] bg-[#FFDEBE] px-3 py-[2px] text-xs font-semibold text-error '>
                    ✦ PREMIUM
                  </div>
                )}
                {index === 2 && (
                  <div className='border-black/0.1 badge-lg rounded-lg border bg-[#7248E6] px-3 py-[2px] text-xs font-semibold text-base-100'>
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
