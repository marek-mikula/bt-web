import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import VerifyForm from '~/types/forms/Mfa/VerifyForm'
import TokenPairResponse from '~/types/http/responses/TokenPairResponse'

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
}
