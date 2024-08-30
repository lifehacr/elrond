import { Page } from '@payload-types'
import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ContactPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type ContactImageType = {
  alt: string
  filePath: string
}

export const contactPageData: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Contact',
  _status: 'published',
  layout: [
    {
      blockType: 'Contact',
      title: 'CONTACT',
      description: "Got something to say? Reach out - We're all ears!",
      image: '',
    },
  ],
}

export const contactImageData: ContactImageType = {
  alt: 'contact side image ',
  filePath: path.join(
    process.cwd(),
    '/public/images/seed/contact/contact.jpeg',
  ),
}
