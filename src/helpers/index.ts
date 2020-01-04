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

export * from './store'
export * from './config'
export * from './history'
