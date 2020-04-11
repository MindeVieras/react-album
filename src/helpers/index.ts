import { UiBrowserSize, UiBrowserOrientation } from '../enums'

export interface IScreenDimensions {
  width: number
  height: number
  size: UiBrowserSize
  orientation: UiBrowserOrientation
}

export const screenDimensions = (): IScreenDimensions => {
  const width = window.innerWidth
  const height = window.innerHeight
  let size = UiBrowserSize.xs
  if (width > 500 && width <= 700) {
    size = UiBrowserSize.sm
  } else if (width > 700 && width <= 1000) {
    size = UiBrowserSize.md
  } else if (width > 1000 && width <= 1280) {
    size = UiBrowserSize.lg
  } else if (width > 1280 && width <= 1400) {
    size = UiBrowserSize.xl
  } else if (width > 1400) {
    size = UiBrowserSize.fs
  }
  const orientation =
    width < height ? UiBrowserOrientation.portrait : UiBrowserOrientation.landscape

  return { width, height, size, orientation }
}

export interface IAuthHeader {
  Authorization?: string
}

/**
 * Builds authorization bearer token header.
 */
export const authHeader = (): IAuthHeader => {
  // Get user form local
  const user = localStorage.getItem('user')

  if (user) {
    const parsedUser: { token: string } = JSON.parse(user)
    // Return authorization header with jwt token.
    return { Authorization: `Bearer ${parsedUser.token}` }
  } else {
    return {}
  }
}

export * from './store'
export * from './config'
export * from './history'
export * from './uploader'
export * from './Locale'
