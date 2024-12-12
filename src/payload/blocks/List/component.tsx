import { Params } from '../types'
import payloadConfig from '@payload-config'
import { ListType, User } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import React from 'react'

import AuthorsList from './components/AuthorsList'
import TagsList from './components/TagsList'

interface ListProps extends ListType {
  params: Params
}

interface AuthorsListProps extends User {
  totalDocs: number
}

const List: React.FC<ListProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: payloadConfig,
  })

  switch (block?.collectionSlug) {
    case 'tags': {
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

      return <TagsList tags={tags} title={block?.title || ''} />
    }

    case 'users': {
      const { docs: authors = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'users',
            where: {
              role: {
                equals: 'author',
              },
            },
            limit: 1000,
          }),
        ['list', 'authors'],
        { tags: ['list-authors'] },
      )()

      return (
        <AuthorsList authors={authors as AuthorsListProps[]} block={block} />
      )
    }
  }
}

export default List
