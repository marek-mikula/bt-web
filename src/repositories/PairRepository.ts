import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { PairPriceResponse } from '~/types/http/Responses'

export default class PairRepository extends BaseRepository {
  price(symbol: string): Promise<AxiosResponse<PairPriceResponse>> {
    return this.ctx.$axios.get<PairPriceResponse>(
      `${this.prefix}/${symbol}/price`
    )
  }
}
