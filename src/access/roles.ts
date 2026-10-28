import type { Access, FieldAccess } from 'payload'

export const ROLES = ['superadmin', 'admin', 'editor', 'sales', 'hr'] as const
export type Role = (typeof ROLES)[number]

export const ROLE_LABELS: Record<Role, string> = {
  superadmin: 'Super Admin',
  admin: 'Admin',
  editor: 'Editor',
  sales: 'Sales',
  hr: 'HR',
}

type MaybeUser = { id?: string | number; role?: Role | null } | null | undefined

export const hasRole = (user: unknown, roles: Role[]): boolean => {
  const u = user as MaybeUser
  return Boolean(u && u.role && roles.includes(u.role))
}

export const anyone: Access = () => true
export const isSuperAdmin: Access = ({ req }) => hasRole(req.user, ['superadmin'])
export const isAdmin: Access = ({ req }) => hasRole(req.user, ['superadmin', 'admin'])
export const isEditor: Access = ({ req }) => hasRole(req.user, ['superadmin', 'admin', 'editor'])
export const isSales: Access = ({ req }) => hasRole(req.user, ['superadmin', 'admin', 'sales'])

export const isSuperAdminField: FieldAccess = ({ req }) => hasRole(req.user, ['superadmin'])
