import Container from '../common/Container'
import { FeaturedPostType } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedPost: React.FC<FeaturedPostType> = ({ ...block }) => {
  return (
    <Container className='my-8 w-full px-4 sm:my-12 md:my-16 md:max-w-[940px] lg:my-20 lg:px-0'>
      <div className='xs:my-10 mx-auto my-8 flex w-full flex-col gap-4 sm:my-12 md:my-16 md:max-w-[940px] lg:my-20 lg:px-0'>
        <h2 className='text-four mb-1 text-sm font-medium uppercase tracking-widest text-secondary-content'>
          {block?.title}
        </h2>
        <div className='flex w-full flex-col items-center gap-6 md:flex-row md:gap-10'>
          <div className='avatar w-full'>
            <div className='relative h-60 w-full rounded-xl md:h-80'>
              <Link href={'/Enchanted Realms of Mushroom Monarchies'}>
                <Image alt='/Featured Post' fill src='/images/home/4-2.webp' />
              </Link>
            </div>
          </div>
          <div className='flex w-full flex-col gap-4'>
            <Link href={'/Enchanted Realms of Mushroom Monarchies'}>
              <h3 className='xs:text-2xl text-xl font-semibold text-base-content'>
                Enchanted Realms of Mushroom Monarchies
              </h3>
            </Link>
            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                <Link href={'/author/Elderich'}>
                  <Image
                    alt='Author 1'
                    src='/images/home/2-1.webp'
                    height={26}
                    width={26}
                    className='rounded-full transition-transform duration-200  hover:transform'
                  />
                </Link>
                <Link href={'/author/parcia miles'}>
                  <Image
                    alt='Author 2'
                    src='/images/home/2-1.webp'
                    height={26}
                    width={26}
                    className='rounded-full transition-transform duration-200  hover:transform'
                  />
                </Link>
              </div>
              <Link href={'/author/Elderich'}>
                <p className='ml-3 text-sm'>
                  <span className='text-[#3F3F46] hover:text-primary'>
                    Elderich
                  </span>{' '}
                  &{' '}
                  <span className='text-[#3F3F46] hover:text-primary'>
                    Parcia Mills
                  </span>
                </p>
              </Link>
            </div>
            <p className='line-clamp-3 w-full text-base font-light leading-[1.48] tracking-[0.1px] text-neutral-content'>
              This journey transcends ordinary boundaries, inviting you to
              explore a world where magic emanates from every cap and the air is
              alive with the hum of mystical kingdoms.
            </p>
            <Link href={'/tag/arcane'}>
              <div className='badge badge-secondary badge-lg rounded-lg border border-zinc-200 text-xs font-semibold hover:opacity-80'>
                ARCANE
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default FeaturedPost
