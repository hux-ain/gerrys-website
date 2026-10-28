import type { Field, GlobalConfig } from 'payload'
import { anyone, isEditor } from '../access/roles'
import { revalidateSite } from '../lib/revalidate'

const image = (name: string, label?: string): Field => ({ name, label, type: 'upload', relationTo: 'media' })

export const HomePage: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: { group: 'Pages' },
  access: { read: anyone, update: isEditor },
  hooks: { afterChange: [({ doc }) => (revalidateSite(), doc)] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banner',
          fields: [
            {
              name: 'slides',
              type: 'array',
              admin: { description: 'Banner slides. Each changes automatically.' },
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                image('image', 'Background image'),
                { name: 'heading', type: 'text', required: true },
                { name: 'text', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'buttonText', type: 'text', defaultValue: 'Discover More' },
                    { name: 'buttonLink', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'About & Stats',
          fields: [
            {
              name: 'about',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'About US' },
                {
                  name: 'paragraphs',
                  type: 'array',
                  admin: { description: 'Wrap words in **double stars** to make them bold.' },
                  fields: [{ name: 'text', type: 'textarea', required: true }],
                },
                image('image'),
              ],
            },
            {
              name: 'stats',
              type: 'array',
              admin: { description: 'Numbers count up from 1 when visitors scroll to them.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 500+' } },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'services',
              type: 'array',
              fields: [
                { name: 'tabTitle', type: 'text', required: true },
                image('image'),
                image('logo'),
                { name: 'points', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
                { name: 'link', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Logos & Certificates',
          fields: [
            { name: 'partners', type: 'array', fields: [{ name: 'name', type: 'text' }, image('logo')] },
            { name: 'clients', type: 'array', fields: [{ name: 'name', type: 'text' }, image('logo')] },
            { name: 'achievements', type: 'array', fields: [{ name: 'title', type: 'text' }, image('image')] },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              fields: [
                image('logo'),
                { name: 'review', type: 'textarea', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'position', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'CTA & Contact',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'lineOne', type: 'text' },
                { name: 'lineTwo', type: 'text' },
                { name: 'text', type: 'textarea' },
                image('background'),
              ],
            },
            {
              name: 'contact',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'text', type: 'text' },
                { name: 'mapEmbedUrl', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
