import { Skeleton } from '@/utils/Skeleton'

const AuthorPostsSkeleton = () => {
  return (
    <div className='mx-auto my-16 flex w-full flex-col gap-5 px-4 md:max-w-screen-sm md:px-0'>
      <div className='flex'>
        <Skeleton className='h-6 w-28' />
        <div className='mx-2'></div>
        <Skeleton className='h-6 w-16' />
      </div>
      <div className='space-y-14'>
        <div className='flex flex-col gap-7 md:flex-row'>
          <Skeleton className='h-28 w-28 rounded-full' />
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-6 w-80' />
              <Skeleton className='h-16 w-[500px]' />
            </div>
            <div className='flex gap-2'>
              <div className='flex gap-2'>
                <Skeleton className='h-7 w-20' />
                <Skeleton className='h-7 w-20' />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-7 md:flex-row'>
          <Skeleton className='h-28 w-28 rounded-full' />
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-6 w-80' />
              <Skeleton className='h-16 w-[500px]' />
            </div>
            <div className='flex gap-2'>
              <div className='flex gap-2'>
                <Skeleton className='h-7 w-20' />
                <Skeleton className='h-7 w-20' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorPostsSkeleton
