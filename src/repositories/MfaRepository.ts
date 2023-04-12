import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import VerifyEmailForm from '~/types/forms/Mfa/VerifyEmailForm'
import TokenPairResponse from '~/types/http/responses/TokenPairResponse'

export default class MfaRepository extends BaseRepository {
  verifyEmail(
    token: string,
    form: VerifyEmailForm
  ): Promise<AxiosResponse<TokenPairResponse>> {
    return this.context.$axios.post<TokenPairResponse>(
      `${this.prefix}/verify-email?token=${token}`,
      form
    )
  }
}
