import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { Notification } from '~/types/http/entities/Notification'

type Data = {
  notification: Notification
}

export default interface MarkAsReadResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.OK
}
