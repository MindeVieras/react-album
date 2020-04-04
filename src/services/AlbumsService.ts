import { IResponsePaginatedData, IRequestGetListParams } from './types'
import { ApiService } from './ApiService'
import { AlbumStatus } from '../enums'

export interface IAlbumProps {
  id: string
  name: string
  status: AlbumStatus
  body?: string
  updatedAt: Date
  createdAt: Date
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
}
