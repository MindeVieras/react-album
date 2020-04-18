import { ICreatedBy } from './types'
import { MediaType, MediaStatus } from '../enums'

export interface IMediaProps {
  readonly id: string
  readonly key: string
  name: string
  readonly size: number
  readonly mime: string
  readonly type: MediaType
  status: MediaStatus
  createdBy: ICreatedBy | string | null
  readonly updatedAt: Date
  readonly createdAt: Date
  metadata: {
    width: number
    height: number
    datetime?: Date
    flash?: number
    iso?: number
    make?: string
    model?: string
    orientation?: number
    duration?: number
    frameRate?: number
    codec?: string
    location?: {
      alt?: number
      altRef: number
      lat?: number
      lon?: number
    }
  }
}
