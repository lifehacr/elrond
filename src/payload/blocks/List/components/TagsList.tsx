import Container from '../../common/Container'
import { Media, Tag } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface TagsListProps extends Tag {
  count: number
}
const TagsList: React.FC<{ tags: TagsListProps[] }> = ({ tags }) => {
  return (
    <Container className='py-24'>
      <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4'>
        {tags?.map((tag, index) => (
          <Link
            key={index}
            href={`tag/${tag?.title}`}
            className='rounded-2xl p-4 transition duration-300 ease-in-out hover:bg-secondary'>
            <div className='flex flex-col items-center justify-center gap-2.5'>
              <div className='avatar'>
                <div className='relative w-24 rounded-full'>
                  <Image alt='Post' src={(tag?.tagImage as Media)?.url!} fill />
                </div>
              </div>
              <div className='text-base font-semibold sm:text-lg'>
                {tag?.title}
              </div>
              <p className='font-medium text-neutral-content'>
                {tag?.count} {tag?.count === 1 ? 'Post' : 'Posts'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default TagsList
