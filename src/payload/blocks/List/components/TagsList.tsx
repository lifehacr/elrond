import Container from '../../common/Container'
import configPromise from '@payload-config'
import { ListType, Media, Tag } from '@payload-types'
import Link from 'next/link'
import { getPayload } from 'payload'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/AvatarComponent'

const TagsList: React.FC<{
  tags: Tag[]
  title: ListType['title']
}> = async ({ tags, title }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  return (
    <Container className='py-24'>
      <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4'>
        {tags?.map(async (tag, index) => {
          const { totalDocs: tagRelatedBlogsCount } = await payload.find({
            collection: 'blogs',
            where: {
              'tags.value': {
                equals: tag.id,
              },
            },
          })

          return (
            <Link
              prefetch
              key={index}
              href={`tag/${tag?.slug}`}
              className='rounded-2xl p-4 transition duration-300 ease-in-out hover:bg-secondary'>
              <div className='flex flex-col items-center justify-center gap-2.5'>
                <div className='avatar'>
                  <div className='relative w-24 rounded-full'>
                    <Avatar className='h-full w-full'>
                      <AvatarImage
                        alt='Post'
                        src={(tag?.tagImage as Media)?.url!}
                      />
                      <AvatarFallback />
                    </Avatar>
                  </div>
                </div>
                <div className='text-base font-semibold sm:text-lg'>
                  {tag?.title}
                </div>
                <p className='font-medium text-neutral-content'>
                  {tagRelatedBlogsCount}{' '}
                  {tagRelatedBlogsCount === 1 ? 'Post' : 'Posts'}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </Container>
  )
}

export default TagsList
