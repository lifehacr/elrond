'use client'

import { Media } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/payload/blocks/common/Button'
import { trpc } from '@/trpc/client'

const SidebarView = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/profile')
  }
  const { data: siteSettingsData } =
    trpc.siteSettings.getSiteSettings.useQuery()

  return (
    <aside className='hidden border-r border-slate-200 md:block md:w-1/3 lg:w-1/4'>
      <div className='sticky top-10 flex flex-col gap-2  p-4 text-sm'>
        <Link prefetch href={'/'} className='relative mb-4 h-5 w-24'>
          <Image
            src={(siteSettingsData?.navbar?.logo?.imageUrl as Media)?.url!}
            alt=''
            fill
          />
        </Link>
        <h2 className='mb-4 text-2xl font-semibold'>Settings</h2>
        <Button
          onClick={handleClick}
          className='h-[34px] !rounded-full bg-primary font-medium text-white hover:bg-[#805AE9]'>
          <span className='hidden sm:inline'>Account Preferences</span>
        </Button>
      </div>
    </aside>
  )
}

export default SidebarView
