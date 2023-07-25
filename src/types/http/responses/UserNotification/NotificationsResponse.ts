import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { Notification } from '~/types/http/entities/Notification'
import { Pagination } from '~/types/http/entities/Pagination'

type Data = {
  notifications: Pagination<Notification>
}

export default interface NotificationsResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.OK
}
