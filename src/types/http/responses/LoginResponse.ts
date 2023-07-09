import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { User } from '~/types/http/entities/User'

type Data = {
  user: User
}

export default interface LoginResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.OK
}
