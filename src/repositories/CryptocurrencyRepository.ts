import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import {
  CryptocurrencyIndexResponse,
  CryptocurrencyQuoteResponse,
  CryptocurrencyTradeResponse,
  CryptocurrencyShowResponse,
  CryptocurrencySymbolPriceResponse
} from '~/types/http/Responses'

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

  show(id: number): Promise<AxiosResponse<CryptocurrencyShowResponse>> {
    return this.ctx.$axios.get<CryptocurrencyShowResponse>(
      `${this.prefix}/${id}`
    )
  }

  quote(id: number): Promise<AxiosResponse<CryptocurrencyQuoteResponse>> {
    return this.ctx.$axios.get<CryptocurrencyQuoteResponse>(
      `${this.prefix}/${id}/quote`
    )
  }

  trade(id: number): Promise<AxiosResponse<CryptocurrencyTradeResponse>> {
    return this.ctx.$axios.get<CryptocurrencyTradeResponse>(
      `${this.prefix}/${id}/trade`
    )
  }

  symbolPrice(
    symbol: string
  ): Promise<AxiosResponse<CryptocurrencySymbolPriceResponse>> {
    return this.ctx.$axios.get<CryptocurrencySymbolPriceResponse>(
      `${this.prefix}/${symbol}/price`
    )
  }
}
