import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import {
  AlertIndexResponse,
  AlertStoreResponse,
  LimitsShowResponse,
  LimitsUpdateResponse,
  SuccessResponse
} from '~/types/http/Responses'
import {
  SettingsAccountKeysForm,
  SettingsAccountPasswordForm,
  SettingsAccountPersonalForm
} from '~/types/forms/Settings'
import { AlertForm } from '~/types/forms/Alerts'
import { Alert } from '~/types/http/Entities'
import { LimitsForm } from '~/types/forms/Limits'

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

  alertsIndex(
    activeOnly: boolean = false
  ): Promise<AxiosResponse<AlertIndexResponse>> {
    return this.ctx.$axios.get<AlertIndexResponse>(`${this.prefix}/alerts`, {
      params: {
        activeOnly: activeOnly ? 1 : 0
      }
    })
  }

  storeAlert(form: AlertForm): Promise<AxiosResponse<AlertStoreResponse>> {
    return this.ctx.$axios.post<AlertStoreResponse>(
      `${this.prefix}/alerts`,
      form
    )
  }

  deleteAlert(alert: Alert): Promise<AxiosResponse<AlertStoreResponse>> {
    return this.ctx.$axios.delete<AlertStoreResponse>(
      `${this.prefix}/alerts/${alert.id}`
    )
  }

  showLimits(): Promise<AxiosResponse<LimitsShowResponse>> {
    return this.ctx.$axios.get<LimitsShowResponse>(`${this.prefix}/limits`)
  }

  updateLimits(form: LimitsForm): Promise<AxiosResponse<LimitsUpdateResponse>> {
    return this.ctx.$axios.patch<LimitsUpdateResponse>(
      `${this.prefix}/limits`,
      form
    )
  }
}
