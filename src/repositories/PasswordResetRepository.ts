import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { PasswordResetEmailForm } from '~/types/forms/PasswordReset'
import { SuccessResponse } from '~/types/http/Responses'

export default class PasswordResetRepository extends BaseRepository {
  sendEmail(
    form: PasswordResetEmailForm
  ): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(
      `${this.prefix}/send-email`,
      form
    )
  }
}
