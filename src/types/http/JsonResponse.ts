import { RESPONSE_CODE } from '~/src/enums/http/ResponseCode'

export default interface JsonResponse<T = {}> {
  message: string
  code: RESPONSE_CODE
  data: T
}
