import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { PasswordResetEmailForm } from '~/types/forms/PasswordReset'

export default class PasswordResetRepository extends BaseRepository {
  sendEmail(
    form: PasswordResetEmailForm
  ): Promise<AxiosResponse<JsonResponse>> {
    return this.context.$axios.post<JsonResponse>(
      `${this.prefix}/send-email`,
      form
    )
  }
}
