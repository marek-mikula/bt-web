import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { LoginForm, RegisterForm } from '~/types/forms/Auth'
import {
  LoginResponse,
  MeResponse,
  MfaTokenResponse,
  SuccessResponse
} from '~/types/http/Responses'

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
    return this.ctx.$axios.post<LoginResponse | MfaTokenResponse>(
      `${this.prefix}/login`,
      form
    )
  }

  logout(): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(`${this.prefix}/logout`)
  }

  csrf(): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.get<SuccessResponse>(`${this.prefix}/csrf-cookie`)
  }

  me(): Promise<AxiosResponse<MeResponse>> {
    return this.ctx.$axios.get<MeResponse>(`${this.prefix}/me`)
  }
}
