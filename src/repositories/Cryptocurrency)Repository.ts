import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { CryptocurrencyIndexResponse } from '~/types/http/Responses'

export default class CryptocurrencyRepository extends BaseRepository {
  index(
    page: number,
    perPage: number = 100
  ): Promise<AxiosResponse<CryptocurrencyIndexResponse>> {
    return this.ctx.$axios.get<CryptocurrencyIndexResponse>(`${this.prefix}/`, {
      params: {
        page,
        perPage
      }
    })
  }
}
