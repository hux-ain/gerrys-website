import type { CollectionConfig } from 'payload'
import { isEditor } from '../access/roles'
import { revalidateSite } from '../lib/revalidate'

export const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    group: 'Content',
  },
  versions: { drafts: true },
  hooks: { afterChange: [({ doc }) => (revalidateSite(), doc)], afterDelete: [({ doc }) => (revalidateSite(), doc)] },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Page address: gerrys.net/<slug>. Leave empty to make it from the title.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => (value ? slugify(String(value)) : data?.title ? slugify(String(data.title)) : value),
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'blog',
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'News & Updates', value: 'news' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText', admin: { description: 'Write new posts here.' } },
    {
      name: 'legacyHtml',
      type: 'code',
      admin: {
        language: 'html',
        description: 'Content imported from WordPress. Shown only when the editor above is empty.',
        condition: (data) => Boolean(data?.legacyHtml),
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
