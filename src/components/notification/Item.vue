<template>
  <div class="relative rounded-lg p-4 hover:bg-gray-50">
    <!-- notification title if read -->
    <div v-if="isRead" class="text-gray-900">
      <NotificationDomain :notification="notification" class="mr-0.5" />

      <span>{{ notification.title }}</span>
    </div>

    <!-- notification title if not read -->
    <a
      v-else
      href="#"
      class="font-semibold text-gray-900"
      @click.prevent="markAsRead"
    >
      <NotificationDomain :notification="notification" class="mr-0.5" />

      <span>{{ notification.title }}</span>

      <span class="absolute inset-0"></span>
    </a>

    <!-- notification body/text -->
    <p v-if="notification.body" class="mt-1 text-sm text-gray-600">
      {{ notification.body }}
    </p>

    <!-- notification timestamp -->
    <p class="mt-1 text-xs text-gray-400">
      {{ notification.createdAt }}
    </p>

    <!-- notification actions based on domain/type etc -->
    <div v-if="notification.domain === 'limits'" class="mt-2">
      <CommonButton
        :label="$t('notifications.actions.changeLimits').toString()"
        :type="'button'"
        :color="'secondary'"
        :size="1"
        @click="redirect({ path: '/app/settings/limits' })"
      />
    </div>
    <div v-else-if="notification.domain === 'whaleAlert'" class="mt-2">
      <CommonButton
        :label="$t('notifications.actions.moreDetails').toString()"
        :type="'button'"
        :color="'secondary'"
        :size="1"
        @click="redirect({ path: '/app/whale-alerts' })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'
import { Notification } from '~/types/http/Entities'
import { useRedirect } from '~/composables/redirect'

const { redirect } = useRedirect()

const props = defineProps<{
  notification: Notification
}>()

const emit = defineEmits<{
  (e: 'read', uuid: string): void
}>()

const isRead = computed<boolean>((): boolean => !!props.notification.readAt)

function markAsRead(): void {
  emit('read', props.notification.uuid)
}
</script>

<script lang="ts">
export default {
  name: 'NotificationItem'
}
</script>
