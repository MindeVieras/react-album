import { Uppy } from '@uppy/core'

declare global {
  interface Window {
    uploader: Uppy
  }
}
