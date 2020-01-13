import { BrowserSize, BrowserOrientation } from '../enums'

export interface IScreenDimensions {
  width: number
  height: number
  size: BrowserSize
  orientation: BrowserOrientation
}

export const screenDimensions = (): IScreenDimensions => {
  const width = window.innerWidth
  const height = window.innerHeight
  let size = BrowserSize.xs
  if (width > 500 && width <= 700) {
    size = BrowserSize.sm
  } else if (width > 700 && width <= 1000) {
    size = BrowserSize.md
  } else if (width > 1000 && width <= 1280) {
    size = BrowserSize.lg
  } else if (width > 1280 && width <= 1400) {
    size = BrowserSize.xl
  } else if (width > 1400) {
    size = BrowserSize.fs
  }
  const orientation = width < height ? BrowserOrientation.portrait : BrowserOrientation.landscape

  return { width, height, size, orientation }
}

/**
 * Gets browser language.
 * Will fallback to 'en'.
 *
 * @returns {string}
 *   Language code like: en, es, ru...
 */
export const browserLocale = (): string => {
  let lang: string

  if (window.navigator.languages && window.navigator.languages.length) {
    // Latest versions of Chrome and Firefox set this correctly.
    lang = window.navigator.languages[0]
  } else if (window.navigator.userLanguage) {
    // IE only.
    lang = window.navigator.userLanguage
  } else if (window.navigator.language) {
    // Latest versions of Chrome, Firefox, and Safari set this correctly.
    lang = window.navigator.language
  } else {
    // Fallback.
    lang = 'en'
  }

  return lang
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
