import { Media } from '@payload-types'
import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type TagDataType = RequiredDataFromCollectionSlug<'tags'>
export type TagImageType = {
  alt: string
  filePath: string
  name: string
}

export const tagsData: TagDataType[] = [
  {
    title: 'Arcane',
    color: 'blue',
    description:
      'Enter the Arcane, where ancient knowledge and mystical arts converge, revealing the secrets that lie beneath the surface of reality.',
    tagImage: '' as unknown as number | Media,
    _status: 'published',
  },

  {
    title: 'Celestial',
    color: 'purple',
    description:
      'Explore the Celestial category, where the celestial bodies align to create breathtaking scenes and cosmic phenomena beyond imagination.',
    tagImage: '' as unknown as number | Media,
    _status: 'published',
  },
  {
    title: 'Elysium',
    color: 'indigo',
    description:
      'Step into Elysium, where blissful retreats and paradisiacal landscapes offer solace and tranquility for the wandering soul.',
    tagImage: '' as unknown as number | Media,
    _status: 'published',
  },
  {
    title: 'Chronicles',
    color: 'green',
    description:
      'Open the Chronicles to journey through the annals of time, discovering tales that transcend eras and unfold the epic sagas of fantastical worlds.',
    tagImage: '' as unknown as number | Media,
    _status: 'published',
  },
  {
    title: 'Nether',
    color: 'green',
    description:
      'Explore the Nether realms, where unseen dimensions and otherworldly landscapes blur the boundaries between reality and the unknown.',
    tagImage: '' as unknown as number | Media,
    _status: 'published',
  },
]
export const tagsImagesData: TagImageType[] = [
  {
    alt: 'Tag 1',
    filePath: path.join(process.cwd(), '/public/images/seed/tags/tag-1.webp'),
    name: 'Arcane',
  },
  {
    alt: 'Tag 2',
    filePath: path.join(process.cwd(), '/public/images/seed/tags/tag-2.webp'),
    name: 'Celestial',
  },
  {
    alt: 'Tag 3',
    filePath: path.join(process.cwd(), '/public/images/seed/tags/tag-3.webp'),
    name: 'Elysium',
  },
  {
    alt: 'Tag 4',
    filePath: path.join(process.cwd(), '/public/images/seed/tags/tag-4.webp'),
    name: 'Chronicles',
  },
  {
    alt: 'Tag 5',
    filePath: path.join(process.cwd(), '/public/images/seed/tags/tag-5.webp'),
    name: 'Nether',
  },
]
