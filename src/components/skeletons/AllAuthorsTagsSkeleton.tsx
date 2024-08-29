import Container from '@/payload/blocks/common/Container'
import { Skeleton } from '@/utils/Skeleton'

const AllAuthorsTagsSkeleton = () => {
  return (
    <Container className='py-24'>
      <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4'>
        <div className='rounded-2xl p-4'>
          <div className='flex flex-col items-center justify-center gap-2.5'>
            <Skeleton className='h-24 w-24 rounded-full' />
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-3 w-14' />
          </div>
        </div>
        <div className='rounded-2xl p-4'>
          <div className='flex flex-col items-center justify-center gap-2.5'>
            <Skeleton className='h-24 w-24 rounded-full' />
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-3 w-14' />
          </div>
        </div>
        <div className='rounded-2xl p-4'>
          <div className='flex flex-col items-center justify-center gap-2.5'>
            <Skeleton className='h-24 w-24 rounded-full' />
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-3 w-14' />
          </div>
        </div>
        <div className='rounded-2xl p-4'>
          <div className='flex flex-col items-center justify-center gap-2.5'>
            <Skeleton className='h-24 w-24 rounded-full' />
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-3 w-14' />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AllAuthorsTagsSkeleton
