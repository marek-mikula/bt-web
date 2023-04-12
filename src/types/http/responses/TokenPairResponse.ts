import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'

type Data = {
  token: {
    type: 'Bearer'
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}

export default interface TokenPairResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.TOKEN_PAIR
}
