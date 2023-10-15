import { ORDER_SIDE } from '~/enums/order/OrderSide'

export interface OrderForm {
  symbol: string | null
  quantity: number
  side: ORDER_SIDE
  ignoreLimitsValidation: boolean
}
