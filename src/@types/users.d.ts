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
