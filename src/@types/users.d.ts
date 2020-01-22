/**
 * User status.
 */
enum UserStatus {
  /**
   * Only admins can block and unblock users.
   */
  blocked = 'blocked',

  /**
   * Active, fully functional user.
   */
  active = 'active',
}

/**
 * User roles.
 */
enum UserRoles {
  /**
   * Viewer can only browse Album.
   */
  viewer = 'viewer',

  /**
   * Authenticated user created by editor or admin.
   */
  authed = 'authed',

  /**
   * Super user that has full access to the system.
   */
  admin = 'admin',
}

interface IUserProps {
  id: string
  username: string
  initials: string
  role: UserRoles
  status: UserStatus
  lastLogin?: Date
  updatedAt: Date
  createdAt: Date
  profile?: {
    email?: string
    displayName?: string
    locale?: string
  }
}
