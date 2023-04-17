import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { MFA_TOKEN_TYPE } from '~/enums/MfaTokenType'

type Data = {
  token: {
    type: MFA_TOKEN_TYPE
    token: string
    validUntil: string
  }
}

export default interface MfaTokenResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.MFA_TOKEN
}
