import configPromise from '@payload-config'
import { FeaturedPostType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import FeaturedPostClient from './components/FeaturedPostClient'

const FeaturedPostServer: React.FC<FeaturedPostType> = async ({ ...block }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: blogs = [] } = await unstable_cache(
    async () =>
      await payload.find({
        collection: 'blogs',
        depth: 5,
        draft: false,
        limit: 1000,
      }),
    ['list', 'blogs'],
    { tags: ['list-blogs'] },
  )()

  const featuredPost = blogs?.at(0)

  return <FeaturedPostClient block={block} featuredPost={featuredPost} />
}

export default FeaturedPostServer
