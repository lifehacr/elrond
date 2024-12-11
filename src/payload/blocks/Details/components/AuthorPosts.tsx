import { Blog, Media, Tag, User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

const AuthorPosts = ({
  blogsData,
  author,
}: {
  blogsData: Blog[]
  author: User
}) => {
  return (
    <div className='mx-auto my-16 flex w-full flex-col gap-5 px-4 md:max-w-screen-sm md:px-0'>
      <div className='flex'>
        <div className='text-sm font-semibold '>{author?.displayName}</div>
        <div className='mx-2'>-</div>
        <div className='text-sm font-semibold  '>
          {blogsData?.length} {blogsData?.length === 1 ? 'POST' : 'POSTS'}
        </div>
      </div>
      <div className='space-y-14'>
        {blogsData?.map((post, index) => (
          <div key={index} className='flex flex-col gap-7 md:flex-row'>
            <div className='avatar'>
              <div className='relative h-60 w-full rounded-xl md:h-28 md:w-28 md:rounded-full'>
                <Link href={`/blog/${post?.slug}`}>
                  <Image
                    fill
                    src={(post?.blogImage as Media)?.url!}
                    alt='BlogPost'
                    className='rounded-full object-cover'
                  />
                </Link>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <Link
                  href={`/blog/${post?.slug}`}
                  className='text-xl font-semibold text-base-content'>
                  {post?.title}
                </Link>
                <p>{post?.description}</p>
              </div>
              <div className='flex gap-2'>
                <div className='flex gap-2'>
                  {post?.tags?.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/tag/${(tag?.value as Tag)?.slug}`}>
                      <div className='badge badge-secondary badge-lg rounded-lg border  border-zinc-200 bg-secondary px-3 py-[2px] text-xs font-semibold hover:opacity-80'>
                        {(tag?.value as Tag)?.title}
                      </div>
                    </Link>
                  ))}
                </div>
                {index === 0 && (
                  <div className='rounded-lg border border-[#FEC896] bg-[#FFDEBE] px-3 py-[2px] text-xs font-semibold text-error'>
                    ✦ PREMIUM
                  </div>
                )}
                {index === 2 && (
                  <div className='border-black/0.1 rounded-lg border bg-primary px-3 py-[2px] text-xs font-semibold text-base-100'>
                    ✽ MEMBER
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuthorPosts
