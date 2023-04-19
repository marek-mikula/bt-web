import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import RegisterForm from '~/types/forms/Auth/RegisterForm'
import LoginForm from '~/types/forms/Auth/LoginForm'
import MfaTokenResponse from '~/types/http/responses/MfaTokenResponse'
import TokenPairResponse from '~/types/http/responses/TokenPairResponse'

export default class AuthRepository extends BaseRepository {
  register(form: RegisterForm): Promise<AxiosResponse<MfaTokenResponse>> {
    return this.context.$axios.post<MfaTokenResponse>(
      `${this.prefix}/register`,
      form
    )
  }

  login(
    form: LoginForm
  ): Promise<AxiosResponse<TokenPairResponse | MfaTokenResponse>> {
    return this.context.$axios.post<TokenPairResponse | MfaTokenResponse>(
      `${this.prefix}/login`,
      form
    )
  }
}
