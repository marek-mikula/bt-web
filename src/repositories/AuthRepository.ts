import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import RegisterForm from '~/types/forms/Auth/RegisterForm'
import LoginForm from '~/types/forms/Auth/LoginForm'
import MfaTokenResponse from '~/types/http/responses/MfaTokenResponse'
import LoginResponse from '~/types/http/responses/LoginResponse'
import SuccessResponse from '~/types/http/responses/SuccessResponse'

export default class AuthRepository extends BaseRepository {
  register(form: RegisterForm): Promise<AxiosResponse<MfaTokenResponse>> {
    return this.context.$axios.post<MfaTokenResponse>(
      `${this.prefix}/register`,
      form
    )
  }

  login(
    form: LoginForm
  ): Promise<AxiosResponse<LoginResponse | MfaTokenResponse>> {
    return this.context.$auth.login({
      data: form
    }) as Promise<AxiosResponse<LoginResponse | MfaTokenResponse>>
  }

  csrf(): Promise<AxiosResponse<SuccessResponse>> {
    return this.context.$axios.get<SuccessResponse>(
      `${this.prefix}/csrf-cookie`
    )
  }
}
