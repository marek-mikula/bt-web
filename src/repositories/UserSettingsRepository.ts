import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { SuccessResponse } from '~/types/http/Responses'
import {
  SettingsAccountKeysForm,
  SettingsAccountPasswordForm,
  SettingsAccountPersonalForm
} from '~/types/forms/Settings'

export default class UserSettingsRepository extends BaseRepository {
  saveAccountPersonal(
    form: SettingsAccountPersonalForm
  ): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(
      `${this.prefix}/account/save-personal`,
      form
    )
  }

  saveAccountPassword(
    form: SettingsAccountPasswordForm
  ): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(
      `${this.prefix}/account/save-password`,
      form
    )
  }

  saveAccountKeys(
    form: SettingsAccountKeysForm
  ): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(
      `${this.prefix}/account/save-keys`,
      form
    )
  }
}
