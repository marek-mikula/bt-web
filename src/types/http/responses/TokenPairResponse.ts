import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { TokenPair } from '~/types/http/entities/Auth'

type Data = {
  token: TokenPair
}

export default interface TokenPairResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.TOKEN_PAIR
}
