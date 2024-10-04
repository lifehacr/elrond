'use client'

import Button from '../common/Button'
import Container from '../common/Container'
import { LatestPostsType, Media, Tag, User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import BlogPostsSkeleton from '@/components/skeletons/BlogPostsSkeleton'
import LatestTagsSkeleton from '@/components/skeletons/LatestTagsSkeleton'
import { trpc } from '@/trpc/client'

const LatestPosts: React.FC<LatestPostsType> = ({ ...block }) => {
  const [noOfPosts, setNoOfPosts] = useState(6)
  const [loading, setLoading] = useState(false)

  const { data: AllBlogs, isLoading: isBlogsLoading } =
    trpc.blog.getAllBlogs.useQuery()
  const { data: AllTags, isLoading: isTagsLoading } =
    trpc.tag.getAllTags.useQuery()
  const route = useRouter()

  const loadPosts = () => {
    setLoading(true)
    setTimeout(() => {
      setNoOfPosts(noOfPosts + 6)
      setLoading(false)
    }, 1000)
  }
  return (
    <Container className='md:max-w-screen-container w-full px-4 sm:my-8 lg:my-12 lg:px-0'>
      <div className='relative mx-auto my-4 flex w-full flex-col items-start justify-between gap-16 sm:my-12 md:max-w-[940px] lg:my-16 lg:flex-row lg:gap-16'>
        <div className='flex flex-col gap-4 md:mx-0'>
          <h2 className='mb-2 text-sm font-medium uppercase tracking-widest text-secondary-content'>
            {block?.titleOne}
          </h2>
          {isBlogsLoading ? (
            <BlogPostsSkeleton />
          ) : (
            <div className='flex w-full flex-col gap-10'>
              {AllBlogs?.slice(0, noOfPosts).map((blog, index) => (
                <div
                  key={index}
                  className='flex w-full flex-col items-start gap-6 sm:flex-row'>
                  <div className='avatar w-full md:w-auto'>
                    <div className='relative h-60 w-full md:h-28 md:w-28'>
                      <Link href={`/${blog?.slug}`}>
                        <Image
                          src={(blog?.blogImage as Media)?.url!}
                          alt={(blog?.blogImage as Media)?.url! || 'Blog'}
                          fill
                          className='rounded-xl object-cover md:rounded-full'
                        />
                      </Link>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3 sm:mt-1'>
                    <div className='flex flex-col gap-2'>
                      <Link href={`/${blog?.slug}`}>
                        <div className='text-lg font-semibold text-base-content'>
                          {blog?.title}
                          {index === 1 ? (
                            <span className='inline-block bg-gradient-to-r from-[#FED7AA] to-[#F97316] bg-clip-text text-transparent'>
                              &nbsp;✦
                            </span>
                          ) : null}
                        </div>
                      </Link>
                      <div className='flex items-center'>
                        <div className='flex -space-x-2'>
                          {blog?.author?.slice(0, 2)?.map((author, index) => (
                            <Link
                              key={index}
                              href={`/author/${(author?.value as User)?.username}`}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              {(author?.value as User)?.imageUrl && (
                                <Image
                                  alt='Author'
                                  src={
                                    ((author?.value as User)?.imageUrl as Media)
                                      ?.url!
                                  }
                                  height={24}
                                  width={24}
                                  className='rounded-full border-2 border-white transition-transform duration-300 hover:scale-110'
                                />
                              )}
                            </Link>
                          ))}
                        </div>
                        <div className='ml-2 flex items-center'>
                          {blog?.author?.slice(0, 2)?.map((author, index) => (
                            <>
                              <Link
                                key={index}
                                href={`/author/${(author?.value as User)?.username}`}>
                                <p className='text-sm font-normal text-[#3F3F46] hover:text-primary'>
                                  {(author?.value as User)?.displayName}
                                </p>
                              </Link>
                              {index === 0 && blog?.author?.length! > 1 && (
                                <span className='mx-1'>&</span>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                      <p className='text-base font-light leading-normal tracking-[0.1px] text-neutral-content'>
                        {blog?.description}
                      </p>
                    </div>
                    <div className='flex gap-3'>
                      <div className='space-x-3'>
                        {blog?.tags?.slice(0, 2)?.map((tag, index) => (
                          <Link
                            key={index}
                            href={`/tag/${(tag?.value as Tag)?.slug}`}>
                            <div className='rounded-lg border border-zinc-200 bg-secondary px-3 py-[2px] text-xs font-medium uppercase tracking-wider text-zinc-700 hover:opacity-80'>
                              {(tag?.value as Tag)?.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                      {index === 0 && (
                        <div className='rounded-lg border border-[#FEC896] bg-[#FFDEBE] px-3 py-[2px] text-xs font-semibold text-[#E56000]'>
                          ✦ PREMIUM
                        </div>
                      )}
                      {index === 2 && (
                        <div className='rounded-lg border bg-[#7248E6] px-3 py-[2px] text-xs font-semibold text-base-100'>
                          ✽ MEMBER
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {AllBlogs?.length! <= noOfPosts ? (
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
        <div className='relative my-8 flex h-full w-full flex-shrink-0 basis-full flex-col items-center gap-10 sm:my-10 md:sticky md:top-6 md:my-0 md:basis-[30%] md:items-start'>
          <div className='flex h-fit w-full flex-col gap-8 sm:max-w-md md:gap-4'>
            <h2 className='text-sm font-medium uppercase tracking-widest text-secondary-content'>
              {block?.titleTwo}
            </h2>
            {isTagsLoading ? (
              <LatestTagsSkeleton />
            ) : (
              <div className=' grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-1'>
                {AllTags?.map((tag, index) => (
                  <Link
                    href={`/tag/${tag?.slug}`}
                    key={index}
                    className='flex w-fit select-none flex-row items-center justify-start gap-3.5 rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-secondary'>
                    <Image
                      src={(tag?.tagImage as Media)?.url!}
                      alt={(tag?.tagImage as Media)?.url! || 'Tag Image'}
                      height={32}
                      width={32}
                      className='rounded-full'
                    />
                    <span className='font-semibold text-base-content'>
                      {tag?.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className='flex h-fit w-full max-w-md flex-col gap-4'>
            <div className='text-sm font-[450] uppercase tracking-widest text-secondary-content'>
              {block?.titleThree}
            </div>
            <div className='flex flex-col gap-3'>
              <div>
                <input
                  type='email'
                  placeholder='Email address'
                  className='flex h-9 w-full items-center justify-start rounded-lg border-0 bg-transparent px-3 text-sm font-medium leading-8 text-base-content shadow-sm ring-1 ring-inset ring-zinc-300 transition-shadow duration-300 placeholder:font-normal focus:ring-2 focus:ring-primary focus-visible:outline-none'
                />
              </div>
              <div>
                <button
                  onClick={() => route?.push(block?.buttonPath)}
                  className='h-9 w-full rounded-lg bg-primary font-medium text-white'>
                  {block?.buttonName}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LatestPosts
