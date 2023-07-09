import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import VerifyForm from '~/types/forms/Mfa/VerifyForm'
import ResetPasswordForm from '~/types/forms/Mfa/ResetPasswordForm'
import SuccessResponse from '~/types/http/responses/SuccessResponse'

export default class MfaRepository extends BaseRepository {
  verifyEmail(
    token: string,
    form: VerifyForm
  ): Promise<AxiosResponse<SuccessResponse>> {
    return this.context.$axios.post<SuccessResponse>(
      `${this.prefix}/verify-email?token=${token}`,
      form
    )
  }

  resetPassword(
    token: string,
    form: ResetPasswordForm
  ): Promise<AxiosResponse<SuccessResponse>> {
    return this.context.$axios.post<SuccessResponse>(
      `${this.prefix}/reset-password?token=${token}`,
      form
    )
  }
}
