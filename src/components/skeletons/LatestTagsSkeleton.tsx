import { Skeleton } from '@/utils/Skeleton'

const LatestTagsSkeleton = () => {
  return (
    <div className=' grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-1'>
      <div className='flex w-fit select-none flex-row items-center justify-start gap-3.5 rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-secondary'>
        <Skeleton className='h-8 w-8 rounded-full' />
        <span className='font-semibold text-base-content'>
          <Skeleton className='h-4 w-16' />
        </span>
      </div>
      <div className='flex w-fit select-none flex-row items-center justify-start gap-3.5 rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-secondary'>
        <Skeleton className='h-8 w-8 rounded-full' />
        <span className='font-semibold text-base-content'>
          <Skeleton className='h-4 w-16' />
        </span>
      </div>
      <div className='flex w-fit select-none flex-row items-center justify-start gap-3.5 rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-secondary'>
        <Skeleton className='h-8 w-8 rounded-full' />
        <span className='font-semibold text-base-content'>
          <Skeleton className='h-4 w-16' />
        </span>
      </div>
      <div className='flex w-fit select-none flex-row items-center justify-start gap-3.5 rounded-xl p-2 transition-all duration-300 ease-in-out hover:bg-secondary'>
        <Skeleton className='h-8 w-8 rounded-full' />
        <span className='font-semibold text-base-content'>
          <Skeleton className='h-4 w-16' />
        </span>
      </div>
    </div>
  )
}

export default LatestTagsSkeleton
