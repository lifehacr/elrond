'use client'

import { Params } from '../types'
import { Blog, DetailsType, Tag, User } from '@payload-types'
import React from 'react'

import { trpc } from '@/trpc/client'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import TagsList from './components/TagsList'

interface ListProps extends DetailsType {
  params: Params
}

interface GetAllBlogsWithCount extends Tag {
  count: number
}

interface AuthorsListProps extends User {
  totalDocs: number
}

const List: React.FC<ListProps> = ({ params, ...block }) => {
  switch (block?.collectionSlug) {
    case 'blogs': {
      const { data: blogs } = trpc.blog.getAllBlogs.useQuery()
      return <BlogsList blogs={blogs as Blog[]} />
    }

    case 'tags': {
      const { data: tags } = trpc.tag.getAllTags.useQuery()
      return <TagsList tags={tags as GetAllBlogsWithCount[]} />
    }

    case 'users': {
      const { data: authors } = trpc.author.getAllAuthorsWithCount.useQuery()

      return <AuthorsList authors={authors as AuthorsListProps[]} />
    }
  }
}

export default List
