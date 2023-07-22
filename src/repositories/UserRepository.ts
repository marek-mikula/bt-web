import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import UnreadNotificationsResponse from '~/types/http/responses/User/UnreadNotificationsResponse'
import NotificationsResponse from '~/types/http/responses/User/NotificationsResponse'
import MarkAsReadResponse from '~/types/http/responses/User/MarkAsReadResponse'
import SuccessResponse from '~/types/http/responses/SuccessResponse'

export default class UserRepository extends BaseRepository {
  unreadNotifications(): Promise<AxiosResponse<UnreadNotificationsResponse>> {
    return this.ctx.$axios.get<UnreadNotificationsResponse>(
      `${this.prefix}/unread-notifications`
    )
  }

  notifications(): Promise<AxiosResponse<NotificationsResponse>> {
    return this.ctx.$axios.get<NotificationsResponse>(
      `${this.prefix}/notifications`
    )
  }

  markAsRead(uuid: string): Promise<AxiosResponse<MarkAsReadResponse>> {
    return this.ctx.$axios.post<MarkAsReadResponse>(
      `${this.prefix}/mark-as-read`,
      {
        uuid
      }
    )
  }

  markAllAsRead(): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(
      `${this.prefix}/mark-all-as-read`
    )
  }
}
