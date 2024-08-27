import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { headers } from 'next/headers'

import Footer from '@/payload/blocks/common/Footer'
import Header from '@/payload/blocks/common/Header'
import { getCurrentUser } from '@/utils/getCurrentUser'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayloadHMR({ config: configPromise })
  const initData = await payload.findGlobal({
    slug: 'site-settings',
    draft: false,
  })
  const headersList = headers()
  const user = await getCurrentUser(headersList)

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <Header />
      <div className='flex-grow'>{children}</div>
      <Footer initData={initData} />
    </div>
  )
}

export default MarketingLayout
