import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import SuccessResponse from '~/types/http/responses/SuccessResponse'
import { ResetPasswordForm, VerifyForm } from '~/types/forms/Mfa'

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
