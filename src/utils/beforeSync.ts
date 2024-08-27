import { BeforeSync } from '@node_modules/@payloadcms/plugin-search/dist/types'

export const BeforeSyncConfig: BeforeSync = ({ originalDoc, searchDoc }) => {
  if (searchDoc?.doc?.relationTo === 'users')
    return {
      ...searchDoc,
      title: `{"title":"${originalDoc?.displayName}","path":"/author/${originalDoc?.username}","imageUrl":"${originalDoc?.imageUrl}"}`,
    }
  else if (searchDoc?.doc?.relationTo === 'blogs')
    return {
      ...searchDoc,
      title: `{"title":"${originalDoc?.title}","path":"/${originalDoc?.slug}","description":"${originalDoc?.description}"}`,
    }
  else if (searchDoc?.doc?.relationTo === 'tags')
    return {
      ...searchDoc,
      title: `{"title":"${originalDoc?.title}","path":"/tag/${originalDoc?.slug}"}`,
    }
  return {
    ...searchDoc,
    title: `{"title":"${originalDoc?.title}","path":"/tag/${originalDoc?.slug}"}`,
  }
}
