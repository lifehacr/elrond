import { Params } from '../types'
import payloadConfig from '@payload-config'
import { ListType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import React from 'react'

import AuthorsList from './components/AuthorsList'
import TagsList from './components/TagsList'

interface ListProps extends ListType {
  params: Params
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

      const { docs: blogs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            limit: 1000,
            select: {
              tags: true,
            },
            populate: {
              tags: {
                slug: true,
              },
            },
          }),
        ['list', 'tags', 'with-blog-count'],
        { tags: ['list-tags-with-blog-count'] },
      )()

      const tagsWithCount = tags.map(tag => {
        const count = blogs.filter(blog => {
          const blogTags = blog.tags

          if (blogTags) {
            return blogTags.find(({ value }) => {
              if (typeof value === 'number') {
                return value === tag.id
              } else {
                return value.id === tag.id
              }
            })
          }
        }).length

        return { ...tag, count }
      })

      return <TagsList tags={tagsWithCount} title={block?.title || ''} />
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

      const { docs: blogs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            limit: 1000,
            select: {
              author: true,
            },
            populate: {
              users: {
                username: true,
                email: true,
              },
            },
          }),
        ['list', 'authors', 'with-blog-count'],
        { tags: ['list-authors-with-blog-count'] },
      )()

      const authorWithCount = authors.map(author => {
        const count = blogs.filter(blog => {
          const blogAuthors = blog.author

          if (blogAuthors) {
            return blogAuthors.find(({ value }) => {
              if (typeof value === 'number') {
                return value === author.id
              } else {
                return value.id === author.id
              }
            })
          }
        }).length

        return { ...author, count }
      })

      return <AuthorsList authors={authorWithCount} block={block} />
    }
  }
}

export default List
