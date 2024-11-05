import Container from '../common/Container'
import { Media, RecommendationsListType } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

const RecommendationsList: React.FC<RecommendationsListType> = ({
  ...block
}) => {
  return (
    <Container className='my-16 w-full px-4 sm:max-w-lg md:px-0'>
      <div className='mb-20 flex flex-col gap-8 md:gap-12'>
        {block?.recommendations?.map((recommendation, index) => (
          <Link
            key={index}
            href={recommendation?.recommendationUrl}
            className='flex gap-5'>
            <div className='relative size-14 shrink-0'>
              <Image
                alt='Recommendations Image'
                src={(recommendation?.image as Media)?.url!}
                fill
              />
            </div>
            <div className='flex flex-col gap-2'>
              <div className='text-lg font-semibold'>
                {recommendation?.title}
              </div>
              <p className='text-secondary-content'>
                {recommendation?.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default RecommendationsList
