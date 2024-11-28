import { Page } from 'payload-types'

export type TagDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const tagDetailsPageData: TagDetailsPageDataType = {
  title: 'Tag Page',
  isDynamic: true,
  slug: 'tag/[-name]',
  parent: null,
  _status: 'published',
  layout: [
    {
      blockType: 'Details',
      collectionSlug: 'tags',
    },
  ],
}
