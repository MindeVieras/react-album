import { ICreatedBy } from './types'
import { MediaType, MediaStatus, MediaSubmitStatus } from '../enums'
import { ApiService } from './ApiService'
import { IReducerRequestState } from '../reducers'

export type MediaItem = IMediaProps | IMediaSubmitProps

export interface IMediaProps extends IReducerRequestState {
  isUppy?: boolean
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
  album?: string
  metadata: {
    width: number
    height: number
    icon: string
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

export interface IMediaSubmitProps extends IReducerRequestState {
  isUppy?: boolean
  id: string
  status: MediaSubmitStatus
  name: IMediaProps['name']
  size: IMediaProps['size']
  mime: IMediaProps['mime']
  progress: number
  album?: IMediaProps['album']
}

/**
 * Create new media values.
 */
export interface IMediaCreateValues {
  readonly key: IMediaProps['key']
  readonly name: IMediaProps['name']
  readonly size: IMediaProps['size']
  readonly mime: IMediaProps['mime']
  readonly album?: IMediaProps['id']
}

/**
 * MediaService class.
 */
export class MediaService extends ApiService {
  constructor(authed: boolean = true) {
    super(authed)
  }

  /**
   * Create media.
   *
   * @param {IMediaCreateValues} values
   *   Url parameters for requesting lists from API.
   *
   * @returns {Promise<IResponse<IMediaProps>>}
   *   Promise including created media object.
   */
  public async create(values: IMediaCreateValues) {
    const res = await this.post<IMediaCreateValues, IMediaProps>('media', values)
    return res
  }

  /**
   * Puts media to trash.
   *
   * @param {IMediaProps['id']} id
   *   Media id.
   *
   * @returns {Promise<IResponse<IMediaProps>>}
   *   Promise including trashed media object.
   */
  public async trash(id: IMediaProps['id']) {
    const res = await this.patch<{ status: MediaStatus }, IMediaProps>(`media/${id}`, {
      status: MediaStatus.trashed,
    })
    return res
  }
}
