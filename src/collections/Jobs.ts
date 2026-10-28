import type { CollectionConfig } from 'payload'
import { anyone, hasRole } from '../access/roles'
import { revalidateSite } from '../lib/revalidate'

const isHR = ({ req }: { req: { user?: unknown } }) => hasRole(req.user, ['superadmin', 'admin', 'hr'])

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Job opening', plural: 'Job openings' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'location', 'type', 'open'], group: 'HR' },
  access: { read: anyone, create: isHR, update: isHR, delete: isHR },
  hooks: { afterChange: [({ doc }) => (revalidateSite(), doc)], afterDelete: [({ doc }) => (revalidateSite(), doc)] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text', defaultValue: 'Karachi' },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'full-time',
          options: [
            { label: 'Full time', value: 'full-time' },
            { label: 'Part time', value: 'part-time' },
            { label: 'Internship', value: 'internship' },
            { label: 'Contract', value: 'contract' },
          ],
        },
      ],
    },
    { name: 'department', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'open', type: 'checkbox', defaultValue: true, label: 'Accepting applications', admin: { position: 'sidebar' } },
  ],
}
