import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type AuthorDataType = RequiredDataFromCollectionSlug<'users'>

export type AuthorImageType = {
  alt: string
  filePath: string
}

export const authorsData: AuthorDataType[] = [
  {
    username: 'celestia-lily',
    email: 'author.1@gmail.com',
    password: 'Welcome@123',
    role: ['author'],
    imageUrl: null,
    displayName: 'Celestia Lily',
  },
  {
    username: 'eldritch-thorn',
    email: 'author.2@gmail.com',
    password: 'Welcome@123',
    role: ['author'],
    imageUrl: null,
    displayName: 'Eldritch Thorn',
  },
  {
    username: 'evelyn-mitchell',
    email: 'author.3@gmail.com',
    password: 'Welcome@123',
    role: ['author'],
    imageUrl: null,
    displayName: 'Evelyn Mitchell',
  },
  {
    username: 'noah-cooper',
    email: 'author.4@gmail.com',
    password: 'Welcome@123',
    role: ['author'],
    imageUrl: null,
    displayName: 'Noah Cooper',
  },
  {
    username: 'patricia-miles',
    email: 'author.5@gmail.com',
    password: 'Welcome@123',
    role: ['author'],
    imageUrl: null,
    displayName: 'Patricia Miles',
  },
]

export const authorImageData: AuthorImageType[] = [
  {
    alt: 'Authors Image 1',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/authors/author-1.webp',
    ),
  },
  {
    alt: 'Authors Image 2',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/authors/author-2.webp',
    ),
  },
  {
    alt: 'Authors Image 3',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/authors/author-3.webp',
    ),
  },
  {
    alt: 'Authors Image 4',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/authors/author-4.webp',
    ),
  },
  {
    alt: 'Authors Image 5',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/authors/author-5.webp',
    ),
  },
]
