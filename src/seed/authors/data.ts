import { RequiredDataFromCollectionSlug } from 'payload'

export type AuthorDataType = RequiredDataFromCollectionSlug<'users'>

export type AuthorImageType = {
  alt: string
  filePath: string
}

export const authorsData: AuthorDataType[] = [
  {
    username: 'Celestia-Lily',
    email: 'author.1@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
    displayName: 'Celestia Lily',
  },
  {
    username: 'Eldritch-Thorn',
    email: 'author.2@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
    displayName: 'Eldritch Thorn',
  },
  {
    username: 'Evelyn-Mitchell',
    email: 'author.3@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
    displayName: 'Evelyn Mitchell',
  },
  {
    username: 'Noah-Cooper',
    email: 'author.4@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
    displayName: 'Noah Cooper',
  },
  {
    username: 'Patricia-Miles',
    email: 'author.5@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
    displayName: 'Patricia Miles',
  },
]

export const authorImageData: AuthorImageType[] = [
  {
    alt: 'Authors Image 1',
    filePath: '/images/seed/authors/author-1.webp',
  },
  {
    alt: 'Authors Image 2',
    filePath: '/images/seed/authors/author-2.webp',
  },
  {
    alt: 'Authors Image 3',
    filePath: '/images/seed/authors/author-3.webp',
  },
  {
    alt: 'Authors Image 4',
    filePath: '/images/seed/authors/author-4.webp',
  },
  {
    alt: 'Authors Image 5',
    filePath: '/images/seed/authors/author-5.webp',
  },
]
