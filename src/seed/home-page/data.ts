import { Page } from 'payload-types'

export type HomePageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const homePageData: HomePageDataType = {
  title: 'Home Page',
  isHome: true,
  _status: 'published',
  layout: [
    {
      blockType: 'Hero',

      description:
        'A super minimal & lightweight theme with Premium Membership and fully Ghost-compatible.',
      image: '',
    },
    {
      blockType: 'FeaturedPost',
      title: 'FEATURED POST',
    },
  ],
}
