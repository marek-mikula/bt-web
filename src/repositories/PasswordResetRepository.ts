import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import SendEmailForm from '~/types/forms/PasswordReset/SendEmailForm'
import JsonResponse from '~/types/http/responses/JsonResponse'

export default class PasswordResetRepository extends BaseRepository {
  sendEmail(form: SendEmailForm): Promise<AxiosResponse<JsonResponse>> {
    return this.context.$axios.post<JsonResponse>(
      `${this.prefix}/send-email`,
      form
    )
  }
}
