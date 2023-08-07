import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { MarkAsReadForm } from '~/types/forms/UserNotification'
import {
  MarkAsReadResponse,
  NotificationsResponse,
  SuccessResponse,
  UnreadNotificationsResponse
} from '~/types/http/Responses'

export default class UserNotificationRepository extends BaseRepository {
  index(page: number): Promise<AxiosResponse<NotificationsResponse>> {
    return this.ctx.$axios.get<NotificationsResponse>(`${this.prefix}`, {
      params: {
        page
      }
    })
  }

  unread(): Promise<AxiosResponse<UnreadNotificationsResponse>> {
    return this.ctx.$axios.get<UnreadNotificationsResponse>(
      `${this.prefix}/unread`
    )
  }

  markAsRead(
    form: MarkAsReadForm | null = null
  ): Promise<AxiosResponse<MarkAsReadResponse | SuccessResponse>> {
    if (!form) {
      return this.ctx.$axios.post<SuccessResponse>(
        `${this.prefix}/mark-as-read`
      )
    }

    return this.ctx.$axios.post<MarkAsReadResponse>(
      `${this.prefix}/mark-as-read`,
      form
    )
  }
}
