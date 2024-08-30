import { Skeleton } from '@/utils/Skeleton'

const BlogPostsSkeleton = () => {
  return (
    <div className='flex w-full flex-col gap-10'>
      <div className='flex w-full flex-col items-start gap-6 sm:flex-row'>
        <div className='avatar w-full md:w-auto'>
          <Skeleton className='h-28 w-28 rounded-full' />
        </div>
        <div className='flex flex-col gap-3 sm:mt-1'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-6 w-80' />
            <div className='flex items-center'>
              <div className='flex -space-x-2'>
                <Skeleton className='h-6 w-6 rounded-full' />
              </div>
              <div className='ml-2 flex items-center'>
                <Skeleton className='h-5 w-20' />
              </div>
            </div>
            <div className='text-base font-light leading-normal tracking-[0.1px] text-neutral-content'>
              <Skeleton className='h-16 w-[450px]' />
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='space-x-3'>
              <Skeleton className='h-7 w-20' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col items-start gap-6 sm:flex-row'>
        <div className='avatar w-full md:w-auto'>
          <Skeleton className='h-28 w-28 rounded-full' />
        </div>
        <div className='flex flex-col gap-3 sm:mt-1'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-6 w-80' />
            <div className='flex items-center'>
              <div className='flex -space-x-2'>
                <Skeleton className='h-6 w-6 rounded-full' />
              </div>
              <div className='ml-2 flex items-center'>
                <Skeleton className='h-5 w-20' />
              </div>
            </div>
            <div className='text-base font-light leading-normal tracking-[0.1px] text-neutral-content'>
              <Skeleton className='h-16 w-[450px]' />
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='space-x-3'>
              <Skeleton className='h-7 w-20' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col items-start gap-6 sm:flex-row'>
        <div className='avatar w-full md:w-auto'>
          <Skeleton className='h-28 w-28 rounded-full' />
        </div>
        <div className='flex flex-col gap-3 sm:mt-1'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-6 w-80' />
            <div className='flex items-center'>
              <div className='flex -space-x-2'>
                <Skeleton className='h-6 w-6 rounded-full' />
              </div>
              <div className='ml-2 flex items-center'>
                <Skeleton className='h-5 w-20' />
              </div>
            </div>
            <div className='text-base font-light leading-normal tracking-[0.1px] text-neutral-content'>
              <Skeleton className='h-16 w-[450px]' />
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='space-x-3'>
              <Skeleton className='h-7 w-20' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostsSkeleton
