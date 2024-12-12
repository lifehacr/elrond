import configPromise from '@payload-config'
import { LatestPostsType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import React from 'react'

import LatestPostsClient from './components/LatestPostsClient'

const LatestPostsServer: React.FC<LatestPostsType> = async ({ ...block }) => {
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

  const { docs: tags = [] } = await unstable_cache(
    async () =>
      await payload.find({
        collection: 'tags',
        depth: 5,
        draft: false,
        limit: 1000,
      }),
    ['list', 'tags'],
    { tags: ['list-tags'] },
  )()

  return <LatestPostsClient blogs={blogs} tags={tags} block={block} />
}

export default LatestPostsServer
