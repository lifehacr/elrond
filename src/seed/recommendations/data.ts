import { Page } from '@payload-types'
import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type RecommendationsDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export type RecommendationsImageType = {
  alt: string
  filePath: string
}

export const recommendationsData: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Recommendations',
  _status: 'published',
  layout: [
    {
      blockType: 'Hero',
      title: 'Recommendations',
      description:
        'Discover handpicked recommendations from our curated list of favorite websites. Explore these suggested sites for a diverse online experience. Find our top picks below.',
      image: '',
    },
    {
      blockType: 'RecommendationsList',
      recommendations: [
        {
          title: 'Spline',
          description:
            'Free 3D design for web with modeling, animation, textures, and collaboration.',
          image: '',
          recommendationUrl: 'https://spline.design/',
        },
      ],
    },
  ],
}

export const recommendationHeroImageData: RecommendationsImageType = {
  alt: 'Recommendations Image',
  filePath: path.join(
    process.cwd(),
    '/public/images/seed/recommendations/recommendationsHero.webp',
  ),
}

export const recommendationListImagesData: RecommendationsImageType[] = [
  {
    alt: 'recommendation Image-1',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/recommendations/spline.png',
    ),
  },
]
