import { Page } from '@payload-types'
import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type FeaturePageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type FeatureImageType = {
  alt: string
  filePath: string
}

export const featurePageData: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Features',
  _status: 'published',
  layout: [
    {
      blockType: 'Hero',
      title: 'Features',
      description:
        'Explore our features for a seamless, powerful, and enjoyable user experience. Discover the essence of our design below.',
      image: '',
    },
    {
      blockType: 'Features',
      features: [
        {
          title: 'General features',
          points: [
            { point: 'Light, Dark and Auto version' },
            { point: 'Ready for Ghost 5.x' },
            { point: 'Fast, lightweight, clean, and minimal. All-in-one' },
            { point: 'Developed with TailwindCSS and Vanilla JS' },
            { point: 'No unnecessary CSS and JavaScript' },
            { point: 'Fully responsive' },
            { point: 'Custom Ads Support' },
            { point: 'Fully compatible with modern browsers' },
            { point: 'Excellent mobile experience' },
            { point: 'Encourages writing, content-focused' },
            { point: 'Custom-developed Lazyload for images and elements' },
          ],
        },
        {
          title: 'Supported Inbuilt Ghost features',
          points: [
            { point: 'Translation Ready' },
            { point: 'Membership tiers' },
            { point: 'Native Search' },
            { point: 'Native Comments' },
            { point: 'Responsive images' },
            { point: 'Site cover image' },
          ],
        },
        // { title: '', points: [{ point: '' }, { point: '' }] },
      ],
    },
  ],
}

export const featureHeroImageData: FeatureImageType = {
  alt: 'feature hero image ',
  filePath: path.join(
    process.cwd(),
    '/public/images/seed/features/featureHero.webp',
  ),
}
