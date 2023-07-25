import { NOTIFICATION_TYPE } from '~/enums/notifications/NotificationType'
import { NOTIFICATION_DOMAIN } from '~/enums/notifications/NotificationDomain'

export interface Notification {
  uuid: string
  type: NOTIFICATION_TYPE
  domain: NOTIFICATION_DOMAIN
  title: string
  body: string
  data: object
  readAt: string | null
  createdAt: string
}
