import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { OrderCreateResponse, OrderIndexResponse } from '~/types/http/Responses'
import { OrderForm } from '~/types/forms/Order'

export default class OrderRepository extends BaseRepository {
  index(page: number): Promise<AxiosResponse<OrderIndexResponse>> {
    return this.ctx.$axios.get<OrderIndexResponse>(`${this.prefix}`, {
      params: {
        page
      }
    })
  }

  create(form: OrderForm): Promise<AxiosResponse<OrderCreateResponse>> {
    return this.ctx.$axios.post<OrderCreateResponse>(`${this.prefix}`, form)
  }
}
