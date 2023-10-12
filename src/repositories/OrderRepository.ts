import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { OrderResponse } from '~/types/http/Responses'
import { OrderForm } from '~/types/forms/Order'

export default class OrderRepository extends BaseRepository {
  buy(form: OrderForm): Promise<AxiosResponse<OrderResponse>> {
    return this.ctx.$axios.post<OrderResponse>(`${this.prefix}/buy`, form)
  }

  sell(form: OrderForm): Promise<AxiosResponse<OrderResponse>> {
    return this.ctx.$axios.post<OrderResponse>(`${this.prefix}/sell`, form)
  }
}
