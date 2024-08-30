import { Page } from '@payload-types'
import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type SubscriptionPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export type SubscriptionImageType = {
  alt: string
  filePath: string
}

export const subscriptionPageData: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Subscribe',
  _status: 'published',
  layout: [
    {
      blockType: 'Subscribe',
      title: 'SUBSCRIBE',

      image: '',
    },
  ],
}

export const subscriptionImageData: SubscriptionImageType = {
  alt: 'subscription side image ',
  filePath: path.join(
    process.cwd(),
    '/public/images/seed/subscription/subscription.jpeg',
  ),
}
