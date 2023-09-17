<template>
  <div class="pointer-events-auto w-screen max-w-sm">
    <div class="flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl">
      <div class="px-4 pb-6 shadow-sm sm:px-6">
        <div class="flex items-center justify-between">
          <h2
            id="slide-over-title"
            class="flex items-center text-base font-semibold leading-6 text-gray-900"
          >
            <svg
              class="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <span>
              {{ $t('notifications.panel.title') }}
            </span>
          </h2>
          <div class="ml-3 flex h-7 items-center">
            <button
              type="button"
              class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click.prevent="closePanel"
            >
              <span class="sr-only">Close panel</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-5">
          <CommonButton
            color="secondary"
            :is-loading="isLoading.button"
            :label="$t('notifications.panel.markAllAsRead').toString()"
            block
            @click="markAllAsRead"
          />
        </div>
      </div>

      <!-- request error -->
      <div v-if="error" class="flex-1 p-4 text-center sm:p-6">
        <div class="flex h-full items-center justify-center">
          <CommonAlert
            type="danger"
            :message="$t('messages.common.requestError').toString()"
          />
        </div>
      </div>

      <div
        v-else
        ref="panelElement"
        class="flex-1 space-y-1 overflow-y-auto p-4 sm:p-6"
      >
        <!-- notifications - empty state -->
        <template v-if="notifications?.length === 0">
          <p class="text-center text-sm text-gray-300">
            {{ $t('common.empty') }}
          </p>
        </template>

        <!-- notifications list -->
        <template v-else-if="notifications?.length > 0">
          <NotificationItem
            v-for="notification in notifications"
            :key="notification.uuid"
            :notification="notification"
            @read="markAsRead"
          />
        </template>

        <!-- loading spinner for notifications -->
        <div
          v-if="isLoading.notifications"
          class="flex items-center justify-center p-4"
        >
          <CommonSpinner :size="10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Vue from 'vue'
import {
  onBeforeUnmount,
  onMounted,
  ref,
  useContext,
  useRoute,
  useStore,
  watch
} from '@nuxtjs/composition-api'
import { useDomainLoading } from '~/composables/loading'
import { MarkAsReadResponse } from '~/types/http/Responses'
import { Notification } from '~/types/http/Entities'
import { useInfiniteScroll } from '~/composables/scroll'

const store = useStore()
const route = useRoute()
const { $repositories, $toast, i18n } = useContext()
const { isLoading, setIsLoading } = useDomainLoading<{
  button: boolean
  notifications: boolean
}>({
  button: false,
  notifications: false
})

const emit = defineEmits<{
  (e: 'closed'): void
}>()

const panelElement = ref<HTMLElement | null>(null)
const { initInfiniteScroll, destroyInfiniteScroll } = useInfiniteScroll(
  panelElement,
  infiniteScrollHandler
)

const error = ref<boolean>(false)
const page = ref<number>(0)
const end = ref<boolean>(false)
const notifications = ref<Notification[] | null>(null)

function closePanel(): void {
  emit('closed')
}

async function fetchNotifications(refresh: boolean = false): Promise<void> {
  setIsLoading('notifications', true)

  if (refresh) {
    page.value = 0
    notifications.value = null
  }

  try {
    page.value += 1

    const response = await $repositories.userNotification.index(page.value)

    const { data, meta } = response.data.data.notifications

    // append current page notifications
    // to the notifications array if the page
    // is not the first one
    if (page.value === 1) {
      notifications.value = data
    } else {
      notifications.value = [...(notifications.value ?? []), ...data]
    }

    end.value = meta.currentPage === meta.lastPage

    error.value = false
  } catch (e: any) {
    error.value = true
  } finally {
    setIsLoading('notifications', false)
  }
}

async function markAsRead(uuid: string): Promise<void> {
  if (!notifications.value) {
    return
  }

  const index = notifications.value.findIndex((n) => n.uuid === uuid)

  if (index < 0) {
    return
  }

  try {
    const response = await $repositories.userNotification.markAsRead({
      uuid
    })

    Vue.set(
      notifications.value,
      index,
      (response.data as MarkAsReadResponse).data.notification
    )

    // decrement the value of unread notifications
    store.commit('notification/decrement')
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  }
}

async function markAllAsRead(): Promise<void> {
  setIsLoading('button', true)

  try {
    await $repositories.userNotification.markAsRead()

    // re-fetch all notifications to update the list
    await fetchNotifications(true)

    // set number of unread notifications to 0
    store.commit('notification/setUnread', 0)
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading('button', false)
  }
}

async function infiniteScrollHandler(): Promise<void> {
  // do not fetch notifications if:
  //    - we hit the end of the list
  //    - notifications hasn't been initially loaded yet
  //    - new notification batch is currently loading
  if (end.value || notifications.value === null || isLoading.notifications) {
    return
  }

  await fetchNotifications()
}

// close menu on route change
watch(
  () => route.value,
  (): void => {
    closePanel()
  }
)

onMounted(async (): Promise<void> => {
  // fetch notifications when panel is opened
  await fetchNotifications()

  initInfiniteScroll()
})

onBeforeUnmount((): void => {
  destroyInfiniteScroll()
})
</script>

<script lang="ts">
export default {
  name: 'NotificationPanel'
}
</script>
