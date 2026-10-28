import type { CollectionConfig } from 'payload'
import { anyone, isEditor } from '../access/roles'
import { revalidateSite } from '../lib/revalidate'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { useAsTitle: 'question', defaultColumns: ['question', 'order'], group: 'Content' },
  defaultSort: 'order',
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  hooks: { afterChange: [({ doc }) => (revalidateSite(), doc)], afterDelete: [({ doc }) => (revalidateSite(), doc)] },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Smaller number shows first' } },
  ],
}
