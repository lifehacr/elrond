import { Params } from '../types'
import payloadConfig from '@payload-config'
import { Blog, ListType, Tag, User } from '@payload-types'
import { getPayload } from 'payload'
import React from 'react'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import TagsList from './components/TagsList'

interface ListProps extends ListType {
  params: Params
}

interface GetAllBlogsWithCount extends Tag {
  count: number
}

interface AuthorsListProps extends User {
  totalDocs: number
}

const List: React.FC<ListProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: payloadConfig,
  })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const { docs: blogs = [] } = await payload.find({
        collection: 'blogs',
        depth: 5,
        draft: false,
        limit: 1000,
      })

      return <BlogsList blogs={blogs as Blog[]} title={block['title']} />
    }

    case 'tags': {
      const { docs: tags = [] } = await payload.find({
        collection: 'tags',
        depth: 5,
        draft: false,
        limit: 1000,
      })

      return <TagsList tags={tags} title={block?.title || ''} />
    }

    case 'users': {
      const { docs: authors = [] } = await payload.find({
        collection: 'users',
        where: {
          role: {
            equals: 'author',
          },
        },
        limit: 1000,
      })

      return (
        <AuthorsList authors={authors as AuthorsListProps[]} block={block} />
      )
    }
  }
}

export default List
