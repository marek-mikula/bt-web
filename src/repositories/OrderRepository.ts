import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { PlaceOrderResponse } from '~/types/http/Responses'
import { OrderForm } from '~/types/forms/Order'

export default class OrderRepository extends BaseRepository {
  place(form: OrderForm): Promise<AxiosResponse<PlaceOrderResponse>> {
    return this.ctx.$axios.post<PlaceOrderResponse>(`${this.prefix}`, form)
  }
}
