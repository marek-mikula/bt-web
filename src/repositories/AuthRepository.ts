import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import RegisterForm from '~/types/forms/Auth/RegisterForm'
import JsonResponse from '~/types/http/responses/JsonResponse'
import LoginForm from '~/types/forms/Auth/LoginForm'
import MfaTokenResponse from '~/types/http/responses/MfaTokenResponse'

export default class AuthRepository extends BaseRepository {
  register(form: RegisterForm): Promise<AxiosResponse<MfaTokenResponse>> {
    return this.context.$axios.post<MfaTokenResponse>(
      `${this.prefix}/register`,
      form
    )
  }

  login(form: LoginForm): Promise<AxiosResponse<JsonResponse>> {
    return this.context.$axios.post<JsonResponse>(`${this.prefix}/login`, form)
  }
}
