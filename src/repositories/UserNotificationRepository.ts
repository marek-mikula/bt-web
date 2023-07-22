import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import UnreadNotificationsResponse from '~/types/http/responses/UserNotification/UnreadNotificationsResponse'
import NotificationsResponse from '~/types/http/responses/UserNotification/NotificationsResponse'
import MarkAsReadResponse from '~/types/http/responses/UserNotification/MarkAsReadResponse'
import { MarkAsReadForm } from '~/types/forms/UserNotification'
import SuccessResponse from '~/types/http/responses/SuccessResponse'

export default class UserNotificationRepository extends BaseRepository {
  index(): Promise<AxiosResponse<NotificationsResponse>> {
    return this.ctx.$axios.get<NotificationsResponse>(`${this.prefix}`)
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
