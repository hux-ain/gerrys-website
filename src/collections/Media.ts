import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access/roles'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*', 'application/pdf'],
    // "Speed guard": photos are capped at 1920px wide and saved as WebP,
    // so nobody can slow the site down by uploading a 5 MB image again.
    resizeOptions: { width: 1920, withoutEnlargement: true },
    formatOptions: { format: 'webp', options: { quality: 80 } },
    imageSizes: [
      { name: 'thumb', width: 480 },
      { name: 'card', width: 960 },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true, label: 'Alt text (describe the image)' }],
}
