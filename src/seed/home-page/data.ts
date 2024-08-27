import path from 'path'
import { Page } from 'payload-types'

export type HomePageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type HomeImageType = {
  alt: string
  filePath: string
}

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

export const homePageHeroImageData: HomeImageType = {
  alt: 'home page hero',
  filePath: path.join(process.cwd(), '/public/images/seed/home/homeHero.svg'),
}
