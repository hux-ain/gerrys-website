import type { CollectionConfig } from 'payload'
import { hasRole, isSuperAdmin, isSuperAdminField, ROLE_LABELS, ROLES } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Admin',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 minute lock after 5 wrong passwords
    tokenExpiration: 8 * 60 * 60, // log out after 8 hours
  },
  access: {
    // Super Admin and Admin see every user, everyone else only sees themselves
    read: ({ req }) => {
      if (!req.user) return false
      if (hasRole(req.user, ['superadmin', 'admin'])) return true
      return { id: { equals: req.user.id } }
    },
    create: isSuperAdmin,
    update: ({ req }) => {
      if (!req.user) return false
      if (hasRole(req.user, ['superadmin'])) return true
      return { id: { equals: req.user.id } }
    },
    delete: isSuperAdmin,
  },
  hooks: {
    beforeChange: [
      // The very first account in a fresh database always becomes Super Admin
      async ({ req, operation, data }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
          if (totalDocs === 0) return { ...data, role: 'superadmin' }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: ROLES.map((r) => ({ label: ROLE_LABELS[r], value: r })),
      access: { create: isSuperAdminField, update: isSuperAdminField },
      admin: { position: 'sidebar' },
    },
  ],
}
