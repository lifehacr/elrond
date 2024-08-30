import Container from '@/payload/blocks/common/Container'
import { Skeleton } from '@/utils/Skeleton'

const FeaturedPostSkeleton = () => {
  return (
    <Container className='my-8 w-full px-4 sm:my-12 md:my-16 md:max-w-[940px] lg:my-20 lg:px-0'>
      <div className='xs:my-10 mx-auto my-8 flex w-full flex-col gap-4 sm:my-12 md:my-16 md:max-w-[940px] lg:my-20 lg:px-0'>
        <h2 className='mb-1'>
          <Skeleton className='h-5 w-24' />
        </h2>
        <div className='flex w-full flex-col items-center gap-6 md:flex-row md:gap-10'>
          <Skeleton className='h-72 w-full rounded-xl' />
          <div className='flex w-full flex-col gap-4'>
            <Skeleton className='h-6 w-80' />
            <Skeleton className='h-6 w-80' />

            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                <Skeleton className='h-6 w-6 rounded-full' />
              </div>
              <div className='ml-3 flex'>
                <Skeleton className='h-5 w-20' />
              </div>
            </div>
            <div className='w-full'>
              <Skeleton className='h-16 w-[450px]' />
            </div>
            <div className='space-x-3'>
              <Skeleton className='h-7 w-16' />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default FeaturedPostSkeleton
