import type { GlobalConfig } from 'payload'
import { anyone, isAdmin } from '../access/roles'
import { revalidateSite } from '../lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [({ doc }) => (revalidateSite(), doc)] },
  fields: [
    {
      name: 'topBar',
      type: 'group',
      fields: [
        {
          name: 'background',
          type: 'text',
          defaultValue: '#DFDFDF',
          admin: { description: 'Hex colour. Pink (#F28DB2) during Pink October, grey (#DFDFDF) normally.' },
        },
        { name: 'showRibbon', type: 'checkbox', defaultValue: false, label: 'Show pink ribbon badges' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', defaultValue: 'info@gerrys.net' },
        { name: 'phone', type: 'text', defaultValue: '(021) 111 - 123 -321' },
        { name: 'phoneLink', type: 'text', defaultValue: '+92-21-111-123-321' },
      ],
    },
    { name: 'whatsapp', type: 'text', defaultValue: '+9221111123321', admin: { description: 'Number for the WhatsApp button' } },
    {
      name: 'socials',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'linkedin', type: 'text' },
      ],
    },
  ],
}
