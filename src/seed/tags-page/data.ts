import path from 'path'
import { Page } from 'payload-types'

export type TagsPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type TagsImageType = {
  alt: string
  filePath: string
}

export const tagsPageData: TagsPageDataType = {
  title: 'Tags',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'Hero',
      title: 'Tags',
      description:
        'Navigate through topics effortlessly with our tags. Click to find related articles and streamline your reading. Discover tag categories below.',
      image: '',
    },
    {
      blockType: 'List',
      collectionSlug: 'tags',
    },
  ],
}

export const tagImageData: TagsImageType = {
  alt: 'All tags',
  filePath: path.join(process.cwd(), '/public/images/seed/tags/tag.webp'),
}
