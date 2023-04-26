import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import VerifyForm from '~/types/forms/Mfa/VerifyForm'
import TokenPairResponse from '~/types/http/responses/TokenPairResponse'
import JsonResponse from '~/types/http/responses/JsonResponse'
import ResetPasswordForm from '~/types/forms/Mfa/ResetPasswordForm'

export default class MfaRepository extends BaseRepository {
  verifyEmail(
    token: string,
    form: VerifyForm
  ): Promise<AxiosResponse<TokenPairResponse>> {
    return this.context.$axios.post<TokenPairResponse>(
      `${this.prefix}/verify-email?token=${token}`,
      form
    )
  }

  verifyDevice(
    token: string,
    form: VerifyForm
  ): Promise<AxiosResponse<TokenPairResponse>> {
    return this.context.$axios.post<TokenPairResponse>(
      `${this.prefix}/verify-device?token=${token}`,
      form
    )
  }

  resetPassword(
    token: string,
    form: ResetPasswordForm
  ): Promise<AxiosResponse<JsonResponse>> {
    return this.context.$axios.post<JsonResponse>(
      `${this.prefix}/reset-password?token=${token}`,
      form
    )
  }
}
