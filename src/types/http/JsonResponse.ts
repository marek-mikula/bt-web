import { RESPONSE_CODE } from '~/enums/http/ResponseCode'

export default interface JsonResponse<T = {}> {
  message: string
  code: RESPONSE_CODE
  data: T
}
