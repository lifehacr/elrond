import Container from '../common/Container'
import { FeaturedPostType, Media, Tag, User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '@/trpc/client'

const FeaturedPost: React.FC<FeaturedPostType> = ({ ...block }) => {
  const { data } = trpc.blog.getAllBlogs.useQuery()
  const featuredPost = data?.at(0)

  return (
    <Container className='my-8 w-full px-4 sm:my-12 md:my-16 md:max-w-[940px] lg:my-20 lg:px-0'>
      <div className='xs:my-10 mx-auto my-8 flex w-full flex-col gap-4 sm:my-12 md:my-16 md:max-w-[940px] lg:my-20 lg:px-0'>
        <h2 className='text-four mb-1 text-sm font-medium uppercase tracking-widest text-secondary-content'>
          {block?.title}
        </h2>
        <div className='flex w-full flex-col items-center gap-6 md:flex-row md:gap-10'>
          <div className='avatar w-full'>
            <div className='relative h-60 w-full rounded-xl md:h-80'>
              <Link href={`/${featuredPost?.slug!}`}>
                <Image
                  alt='Featured Post'
                  fill
                  src={(featuredPost?.blogImage as Media)?.url!}
                />
              </Link>
            </div>
          </div>
          <div className='flex w-full flex-col gap-4'>
            <Link href={`/${featuredPost?.slug!}`}>
              <h3 className='text-xl font-semibold text-base-content md:text-2xl'>
                {featuredPost?.title}
              </h3>
            </Link>
            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                {featuredPost?.author?.slice(0, 2)?.map((author, index) => (
                  <Link
                    key={index}
                    href={`/author/${(author?.value as User)?.username}`}>
                    <Image
                      alt='Author Image'
                      src={(author?.value as User)?.imageUrl!}
                      height={26}
                      width={26}
                      className='rounded-full border-2 border-white transition-transform duration-300 hover:scale-110 hover:transform'
                    />
                  </Link>
                ))}
              </div>
              <div className='ml-3 flex'>
                {featuredPost?.author?.slice(0, 2)?.map((author, index) => (
                  <div key={index} className='flex items-center'>
                    <Link
                      href={`/author/${(author?.value as User)?.username}`}
                      className='text-[#3F3F46] hover:text-primary'>
                      {(author?.value as User)?.displayName}
                    </Link>
                    {index === 0 && featuredPost?.author?.length! > 1 && (
                      <span className='mx-1'>&</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className='line-clamp-3 w-full text-base font-light leading-[1.48] tracking-[0.1px] text-neutral-content'>
              {featuredPost?.description}
            </p>
            <div className='space-x-3'>
              {featuredPost?.tags?.slice(0, 2)?.map((tag, index) => (
                <Link
                  key={index}
                  href={`/tag/${(tag?.value as Tag)?.slug}`}
                  className={`badge badge-secondary badge-lg rounded-lg border border-zinc-200 text-xs font-semibold hover:opacity-80`}>
                  {(tag?.value as Tag)?.title?.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default FeaturedPost
