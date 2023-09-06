import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { AssetIndexResponse } from '~/types/http/Responses'

export default class UserAssetRepository extends BaseRepository {
  index(): Promise<AxiosResponse<AssetIndexResponse>> {
    return this.ctx.$axios.get<AssetIndexResponse>(`${this.prefix}/`)
  }
}
