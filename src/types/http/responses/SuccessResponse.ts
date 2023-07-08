import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'

export default interface SuccessResponse extends JsonResponse {
  code: RESPONSE_CODE.OK
}
