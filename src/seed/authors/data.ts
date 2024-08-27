import { RequiredDataFromCollectionSlug } from 'payload'

export type AuthorDataType = RequiredDataFromCollectionSlug<'users'>

export type AuthorImageType = {
  alt: string
  filePath: string
}

export const authorsData: AuthorDataType[] = [
  {
    username: 'Author-1',
    email: 'author.1@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    username: 'Author-2',
    email: 'author.2@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    username: 'Author-3',
    email: 'author.3@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    username: 'Author-4',
    email: 'author.4@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    username: 'Author-5',
    email: 'author.5@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    username: 'Admin',
    email: 'admin@contentql.com',
    password: 'Welcome@123',
    role: 'admin',
    imageUrl: '',
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
  {
    alt: 'admin',
    filePath: '/images/seed/authors/author-6.webp',
  },
]
