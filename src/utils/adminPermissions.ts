import { AdminUser, Permission, AdminRole, RoleConfig } from '../types';

export const ROLES_CONFIG: Record<AdminRole, RoleConfig> = {
  super_admin: {
    id: 'super_admin',
    label: 'مدير خارق (Super Admin)',
    permissions: ['all']
  },
  content_manager: {
    id: 'content_manager',
    label: 'مدير محتوى',
    permissions: [
      'content.view', 'content.create', 'content.edit', 'content.delete', 'content.publish',
      'settings.view'
    ]
  },
  security_admin: {
    id: 'security_admin',
    label: 'مدير أمني',
    permissions: [
      'security.view_logs', 'security.manage_sessions',
      'users.view', 'admins.view',
      'settings.view'
    ]
  },
  moderator: {
    id: 'moderator',
    label: 'مشرف مراجعة',
    permissions: [
      'content.view', 'content.edit',
      'users.view'
    ]
  },
  viewer: {
    id: 'viewer',
    label: 'مشاهد فقط',
    permissions: [
      'content.view', 'users.view', 'admins.view', 'security.view_logs', 'settings.view'
    ]
  }
};

export function hasPermission(user: AdminUser | null, permission: Permission): boolean {
  if (!user || !user.isActive) return false;
  
  const rolePermissions = ROLES_CONFIG[user.role]?.permissions || [];
  const customPermissions = user.customPermissions || [];
  const allPermissions = [...rolePermissions, ...customPermissions];

  if (allPermissions.includes('all')) return true;
  
  return allPermissions.includes(permission);
}

export function getEffectivePermissions(user: AdminUser): Permission[] {
  if (user.role === 'super_admin') return ['all'];
  
  const rolePermissions = ROLES_CONFIG[user.role]?.permissions || [];
  const customPermissions = user.customPermissions || [];
  return Array.from(new Set([...rolePermissions, ...customPermissions]));
}
