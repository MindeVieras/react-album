import { IResponsePaginatedData, IRequestGetListParams, ICreatedBy } from './types'
import { ApiService } from './ApiService'
import { AlbumStatus } from '../enums'
import { IMediaProps, IMediaSubmitProps } from './MediaService'

export interface IAlbumProps {
  id: string
  name: string
  status: AlbumStatus
  body?: string
  updatedAt: Date
  createdAt: Date
  createdBy: ICreatedBy | string | null
  media?: IMediaProps[] & IMediaSubmitProps[]
}

/**
 * AlbumsService class.
 */
export class AlbumsService extends ApiService {
  constructor(authed: boolean = true) {
    super(authed)
  }

  /**
   * Gets list of albums.
   *
   * @param {IRequestGetListParams} params
   *   Url parameters for requesting lists from API.
   *
   * @returns {Promise<IResponse<IResponsePaginatedData<IAlbumProps>>>}
   *   Response promise including paginated list of albums.
   */
  public async getList(params?: IRequestGetListParams) {
    const res = await this.get<IResponsePaginatedData<IAlbumProps>>('albums', {
      params,
    })
    return res
  }

  /**
   * Gets an album by id.
   *
   * @param {string} id
   *   Album document ID.
   *
   * @returns {Promise<IResponse<IAlbumProps>>}
   *   Response promise including album.
   */
  public async getOne(id: string) {
    const res = await this.get<IAlbumProps>(`albums/${id}`)
    return res
  }
}
