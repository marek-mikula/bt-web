import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { ResetPasswordForm, VerifyForm } from '~/types/forms/Mfa'
import { SuccessResponse } from '~/types/http/Responses'

export default class MfaRepository extends BaseRepository {
  verifyEmail(
    token: string,
    form: VerifyForm
  ): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(
      `${this.prefix}/verify-email?token=${token}`,
      form
    )
  }

  resetPassword(
    token: string,
    form: ResetPasswordForm
  ): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(
      `${this.prefix}/reset-password?token=${token}`,
      form
    )
  }
}
