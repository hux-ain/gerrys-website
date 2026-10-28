import type { CollectionConfig } from 'payload'
import { isAdmin, isSales } from '../access/roles'

// Every form on the website (calculator, contact, quote, newsletter) lands here.
export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'type', 'status', 'createdAt'],
    group: 'Sales',
    listSearchableFields: ['name', 'email', 'phone', 'company'],
  },
  access: {
    read: isSales,
    create: () => false, // only the website's own server code creates leads
    update: isSales,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'ROI Calculator', value: 'calculator' },
            { label: 'Contact form', value: 'contact' },
            { label: 'Get a Quote', value: 'quote' },
            { label: 'Newsletter', value: 'newsletter' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Site Survey', value: 'survey' },
            { label: 'Quoted', value: 'quoted' },
            { label: 'Won', value: 'won' },
            { label: 'Lost', value: 'lost' },
          ],
        },
      ],
    },
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text' },
        { name: 'area', type: 'text' },
      ],
    },
    { name: 'source', type: 'text', label: 'How did you find us?' },
    { name: 'message', type: 'textarea' },
    { name: 'calculation', type: 'json', admin: { description: 'Calculator inputs and result' } },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },
    { name: 'notes', type: 'textarea', admin: { position: 'sidebar' } },
  ],
}
