import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'

type Data = {
  count: number
}

export default interface UnreadNotificationsResponse
  extends JsonResponse<Data> {
  code: RESPONSE_CODE.OK
}
