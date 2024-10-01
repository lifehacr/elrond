'use client'

import { Blog, Media, User } from '@payload-types'
import { slateToHtml } from '@slate-serializers/html'
import DOMPurify from 'isomorphic-dompurify'
import Image from 'next/image'
import Link from 'next/link'

const BlogView = ({ blog }: { blog: Blog }) => {
  const date = new Date(blog?.createdAt)
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getUTCFullYear()
  const formattedDate = `${day} ${month} ${year}`

  const html = slateToHtml(blog?.content)
  const sanitizeHtml = DOMPurify.sanitize(html)

  const readingTime = require('reading-time')
  const postReadTime = readingTime(sanitizeHtml)

  return (
    <div className='mx-auto my-12 flex flex-col items-center gap-2 px-4 sm:my-24 md:max-w-2xl  md:px-0'>
      <div className='flex w-full flex-col items-center gap-8'>
        <div className='flex'>
          <div className='text-secondary-content'>{formattedDate}</div>
          <div className='mx-4'>.</div>
          <div className='text-secondary-content'>{postReadTime.text}</div>
        </div>
        <div className='text-center font-bold sm:text-4xl md:text-5xl'>
          {blog?.title}
        </div>
        <p className='text-center text-lg text-secondary-content'>
          {blog?.description}
        </p>
        <div className='flex items-center gap-2'>
          <div className='flex -space-x-2'>
            {blog?.author?.slice(0, 2)?.map((author, index) => (
              <Link
                key={index}
                href={`/author/${(author?.value as User)?.username}`}
                className='relative h-8 w-8'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  alt='Author'
                  src={(author?.value as Media)?.url!}
                  className='rounded-full border-2 border-white transition-transform duration-300 hover:scale-110 hover:transform'
                />
              </Link>
            ))}
          </div>
          <div className='flex'>
            {blog?.author?.slice(0, 2)?.map((author, index) => (
              <div key={index}>
                <Link
                  className='ml-2 hover:text-primary'
                  href={`/author/${(author?.value as User)?.username}`}>
                  {(author?.value as User)?.displayName}
                </Link>
                {index === 0 && blog?.author?.length! > 1 && (
                  <span className='mx-1'>&</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='avatar mb-6 w-full'>
          <div className='relative h-60 w-full rounded-xl md:h-96'>
            <Image alt='Post' src={(blog?.blogImage as Media)?.url!} fill />
          </div>
        </div>
      </div>
      <div
        className='prose'
        dangerouslySetInnerHTML={{ __html: sanitizeHtml }}
      />
    </div>
  )
}

export default BlogView
