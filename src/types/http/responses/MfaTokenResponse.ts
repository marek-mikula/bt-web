import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'

type Data = {
  token: {
    type: 'MFA'
    token: string
    validUntil: string
  }
}

export default interface MfaTokenResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.MFA_TOKEN
}
