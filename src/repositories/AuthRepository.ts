import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import MfaTokenResponse from '~/types/http/responses/MfaTokenResponse'
import LoginResponse from '~/types/http/responses/LoginResponse'
import SuccessResponse from '~/types/http/responses/SuccessResponse'
import { LoginForm, RegisterForm } from '~/types/forms/Auth'

export default class AuthRepository extends BaseRepository {
  register(form: RegisterForm): Promise<AxiosResponse<MfaTokenResponse>> {
    return this.ctx.$axios.post<MfaTokenResponse>(
      `${this.prefix}/register`,
      form
    )
  }

  login(
    form: LoginForm
  ): Promise<AxiosResponse<LoginResponse | MfaTokenResponse>> {
    return this.ctx.$auth.login({
      data: form
    }) as Promise<AxiosResponse<LoginResponse | MfaTokenResponse>>
  }

  csrf(): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.get<SuccessResponse>(`${this.prefix}/csrf-cookie`)
  }
}
