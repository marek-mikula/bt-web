<template>
  <span
    :class="[
      'inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium',
      colorClass
    ]"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed, useContext } from '@nuxtjs/composition-api'
import { NOTIFICATION_DOMAIN } from '~/enums/notifications/NotificationDomain'
import { Notification } from '~/types/http/Entities'

const { i18n } = useContext()

const props = defineProps<{
  notification: Notification
}>()

const colorClass = computed<string>((): string => {
  switch (props.notification.domain) {
    case NOTIFICATION_DOMAIN.USER:
      return 'bg-blue-100 text-blue-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
})

const label = computed<string>((): string => {
  return i18n.t(`notifications.domain.${props.notification.domain}`).toString()
})
</script>

<script lang="ts">
export default {
  name: 'NotificationDomain'
}
</script>
