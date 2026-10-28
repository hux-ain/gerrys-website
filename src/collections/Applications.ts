import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { hasRole } from '../access/roles'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const isHR = ({ req }: { req: { user?: unknown } }) => hasRole(req.user, ['superadmin', 'admin', 'hr'])

/** CV files. Private: only HR / Admin can open them. */
export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: { group: 'HR', hidden: ({ user }) => !hasRole(user, ['superadmin', 'admin', 'hr']) },
  access: { read: isHR, create: () => false, update: isHR, delete: isHR },
  upload: {
    staticDir: path.resolve(dirname, '../../private/resumes'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [],
}

/** Career form submissions. */
export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'position', 'status', 'createdAt'], group: 'HR' },
  access: { read: isHR, create: () => false, update: isHR, delete: isHR },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
      ],
    },
    { name: 'position', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'resume', type: 'upload', relationTo: 'resumes' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Interview', value: 'interview' },
        { label: 'Hired', value: 'hired' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
