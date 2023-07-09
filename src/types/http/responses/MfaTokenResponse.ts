import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { MfaToken } from '~/types/http/entities/Mfa'

type Data = {
  token: MfaToken
}

export default interface MfaTokenResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.MFA_TOKEN
}
