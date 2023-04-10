import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'

export default interface InvalidContentResponse
  extends JsonResponse<{ errors: { [key: string]: string[] } }> {
  code: RESPONSE_CODE.INVALID_CONTENT
}
