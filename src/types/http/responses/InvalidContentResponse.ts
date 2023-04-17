import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'

type Data = {
  errors: {
    [key: string]: string[]
  }
}

export default interface InvalidContentResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.INVALID_CONTENT
}
