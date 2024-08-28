import type { BeforeSync } from '@payloadcms/plugin-search/types'

export const BeforeSyncConfig: BeforeSync = ({ originalDoc, searchDoc }) => {
  if (searchDoc?.doc?.relationTo === 'users' && originalDoc?.role !== 'admin') {
    // console.log('original doc', originalDoc, '\nsearchDoc', searchDoc)
    return {
      ...searchDoc,
      title: `{"title":"${originalDoc?.displayName}","path":"/author/${originalDoc?.username}","imageUrl":"${originalDoc?.imageUrl}"}`,
    }
  } else if (searchDoc?.doc?.relationTo === 'blogs')
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
    doc: { relationTo: '', value: '' },
    title: '',
  }
}
